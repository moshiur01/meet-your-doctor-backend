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
  doctorServiceId: string,
  doctorId: string,
  slotId: string
): Promise<any> => {
  //check the availableService
  const doctorService = await prisma.doctorService.findUnique({
    where: {
      id: doctorServiceId,
    },
  });

  if (!doctorService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This service is not found');
  }

  if (doctorService.availableSeats === 0) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This service is fully booked');
  }

  const booking = await prisma.$transaction(async transactionClient => {
    const appointment = await transactionClient.appointment.create({
      data: {
        doctorServiceId,
        patientId,
        doctorId,
        slotId,
        status: 'pending',
      },
    });

    await transactionClient.doctorService.update({
      where: {
        id: doctorServiceId,
      },

      data: {
        availableSeats: doctorService.availableSeats - 1,
        isBooked: doctorService.availableSeats - 1 === 0 ? true : false,
      },
    });

    const payment = await transactionClient.payment.create({
      data: {
        amount: doctorService.fees,
        paymentStatus: 'pending',
        appointmentId: appointment.id,
      },
    });

    const medicineStatus = await transactionClient.medicine.create({
      data: {
        status: 'pending',
        appointmentId: appointment.id,
      },
    });

    return {
      appointment: appointment,
      payment: payment,
      medicineStatus: medicineStatus,
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

      const availableService = await transactionClient.doctorService.findUnique(
        {
          where: {
            id: appointment.doctorServiceId,
          },
        }
      );

      await transactionClient.doctorService.update({
        where: {
          id: appointment.doctorServiceId,
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

      await transactionClient.medicine.update({
        where: {
          appointmentId,
        },
        data: {
          status: 'canceled',
        },
      });

      return {
        appointment: appointmentToCancel,
      };
    }
  );

  return canceledAppointment;
};

const finishAppointment = async (appointmentId: string): Promise<any> => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });

  if (!appointment) {
    throw new Error('Appointment does not exist');
  }

  if (appointment.status === 'cancelled') {
    throw new Error('Appointment has already been cancelled');
  }

  const finishedAppointment = await prisma.$transaction(
    async transactionClient => {
      await transactionClient.payment.update({
        where: {
          appointmentId,
        },
        data: {
          paymentStatus: 'paid',
          paymentDate: new Date().toISOString(),
        },
      });

      await transactionClient.medicine.update({
        where: {
          appointmentId,
        },
        data: {
          status: 'pending',
        },
      });

      const appointmentToFinish = await transactionClient.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: 'finished',
        },
      });

      if (!appointmentToFinish) {
        await transactionClient.payment.update({
          where: {
            appointmentId,
          },
          data: {
            paymentStatus: 'refund',
          },
        });
      }

      return appointmentToFinish;
    }
  );

  return finishedAppointment;
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
      doctor: {
        include: {
          specialization: true,
        },
      },
      medicine: true,
      payment: true,
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
      doctor: true,
      medicine: true,
      payment: true,
      patient: true,
      timeSlot: true,
      doctorService: true,
    },
  });
  return result;
};

const getAllAppointmentsByPatients = async (
  id: string
): Promise<Appointment[] | null> => {
  const result = await prisma.appointment.findMany({
    where: {
      patientId: id,
    },
    include: {
      doctor: true,
      medicine: true,
      payment: true,
      patient: true,
      timeSlot: true,
      doctorService: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return result;
};

const getAllAppointmentsByDoctors = async (
  id: string
): Promise<Appointment[] | null> => {
  const result = await prisma.appointment.findMany({
    where: {
      doctorId: id,
    },
    include: {
      doctor: true,
      medicine: true,
      payment: true,
      patient: true,
      timeSlot: true,
      doctorService: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return result;
};

const updateAppointment = async (
  id: string,
  appointment: Partial<Appointment>
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
  getAllAppointmentsByPatients,
  getAllAppointmentsByDoctors,
  updateAppointment,
  deleteAppointment,
  finishAppointment,
};
