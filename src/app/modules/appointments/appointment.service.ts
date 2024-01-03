/* eslint-disable @typescript-eslint/no-explicit-any */
import { Appointment, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IAppointmentFilterRequest } from './appointment.interface';
import {
  appointmentRelationalFields,
  appointmentRelationalFieldsMapper,
} from './appointments.constrain';

const bookAppointment = async (
  patientId: string,
  availableServiceId: string,
  appointmentDate: string
): Promise<any> => {
  //check the availableService
  const availableService = await prisma.availableService.findUnique({
    where: {
      id: availableServiceId,
    },
  });

  if (!availableService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This service is not found');
  }

  if (availableService.availableSeats === 0) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This service is fully booked');
  }

  const booking = await prisma.$transaction(async transactionClient => {
    const appointment = await transactionClient.appointment.create({
      data: {
        appointmentDate,
        patientId,
        availableServiceId,
        status: 'pending',
      },
    });

    await transactionClient.availableService.update({
      where: {
        id: availableServiceId,
      },

      data: {
        availableSeats: availableService.availableSeats - 1,
        isBooked: availableService.availableSeats - 1 === 0 ? true : false,
      },
    });

    const payment = await transactionClient.payment.create({
      data: {
        amount: availableService.fees,
        paymentStatus: 'pending',
        appointmentId: appointment.id,
      },
    });

    return {
      appointment: appointment,
      payment: payment,
    };
  });

  return booking;
};

const canceledAppointment = async (appointmentId: string): Promise<any> => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });

  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'The appointment does not exist');
  }

  if (appointment.status === 'canceled') {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Appointment has already been canceled'
    );
  }

  if (appointment.status === 'finished') {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Appointment has already been finished'
    );
  }

  const canceledAppointment = await prisma.$transaction(
    async transactionClient => {
      const appointmentToCancel = await transactionClient.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: 'canceled',
        },
      });

      const availableService =
        await transactionClient.availableService.findUnique({
          where: {
            id: appointment.availableServiceId,
          },
        });

      await transactionClient.availableService.update({
        where: {
          id: appointment.availableServiceId,
        },
        data: {
          availableSeats: {
            increment: 1,
          },

          isBooked:
            availableService && availableService.availableSeats + 1 > 0
              ? false
              : true,
        },
      });

      await transactionClient.payment.update({
        where: {
          appointmentId,
        },
        data: {
          paymentStatus: 'canceled',
        },
      });

      return {
        appointment: appointmentToCancel,
      };
    }
  );

  return canceledAppointment;
};

const getAllAppointment = async (
  options: IPaginationOptions,
  filters: IAppointmentFilterRequest
): Promise<IGenericResponse<Appointment[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  //*exact match
  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map(key => {
        //filter for relational fields
        if (appointmentRelationalFields.includes(key)) {
          return {
            [appointmentRelationalFieldsMapper[key]]: {
              id: (filters as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filters as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.AppointmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.appointment.findMany({
    where: whereConditions,
    include: {
      availableService: true,
      patient: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.appointment.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleAppointment = async (
  id: string
): Promise<Appointment | null> => {
  const result = await prisma.appointment.findUnique({
    where: {
      id: id,
    },
    include: {
      availableService: true,
      patient: true,
    },
  });
  return result;
};

const updateAppointment = async (
  id: string,
  appointment: Appointment
): Promise<Appointment> => {
  const result = await prisma.appointment.update({
    where: {
      id: id,
    },
    data: appointment,
  });
  return result;
};

const deleteAppointment = async (id: string): Promise<Appointment> => {
  const result = await prisma.appointment.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const appointmentService = {
  bookAppointment,
  canceledAppointment,
  getAllAppointment,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
};
