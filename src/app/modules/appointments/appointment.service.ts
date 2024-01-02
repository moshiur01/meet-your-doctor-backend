/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

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

export const appointmentService = {
  bookAppointment,
};
