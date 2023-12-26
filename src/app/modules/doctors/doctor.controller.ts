import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { doctorFilterableFields } from './doctor.constrain';
import { doctorService } from './doctor.service';

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.createDoctor(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor created successfully',
    data: result,
  });
});

const getAllDoctor = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doctorFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await doctorService.getAllDoctor(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctors data fetched successfully',
    data: result,
  });
});

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.getSingleDoctor(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single doctor data fetched successfully',
    data: result,
  });
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.updateDoctor(req?.params?.id, req?.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor data updated successfully',
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.deleteDoctor(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor data deleted successfully',
    data: result,
  });
});

export const doctorController = {
  createDoctor,
  getAllDoctor,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
