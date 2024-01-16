import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { appointmentService } from './appointment.service';
import { appointmentFilterableFields } from './appointments.constrain';

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
  const { patientId, doctorServiceId, doctorId, slotId } = req?.body;
  const result = await appointmentService.bookAppointment(
    patientId,
    doctorServiceId,
    doctorId,
    slotId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment created successfully',
    data: result,
  });
});

const canceledAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.canceledAppointment(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment canceled successfully',
    data: result,
  });
});

const finishAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.finishAppointment(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment finished successfully',
    data: result,
  });
});

const getAllAppointment = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, appointmentFilterableFields);

  const result = await appointmentService.getAllAppointment(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment data fetched Successfully',
    data: result,
  });
});

const getSingleAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.getSingleAppointment(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single appointment data fetched Successfully',
    data: result,
  });
});

const updateAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.updateAppointment(
    req?.params?.id,
    req?.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment data updated Successfully',
    data: result,
  });
});

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.deleteAppointment(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment data deleted Successfully',
    data: result,
  });
});

export const appointmentController = {
  bookAppointment,
  canceledAppointment,
  getAllAppointment,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
  finishAppointment,
};
