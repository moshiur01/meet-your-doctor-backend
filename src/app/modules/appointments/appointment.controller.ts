import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { appointmentService } from './appointment.service';

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
  const { patientId, availableServiceId, appointmentDate } = req?.body;
  const result = await appointmentService.bookAppointment(
    patientId,
    availableServiceId,
    appointmentDate
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment created successfully',
    data: result,
  });
});

export const appointmentController = {
  bookAppointment,
};
