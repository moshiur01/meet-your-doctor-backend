import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { doctorServiceFilterableFields } from './doctorService.constrain';
import { DocService } from './doctorService.service';

const createDoctorService = catchAsync(async (req: Request, res: Response) => {
  const result = await DocService.createDoctorService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor service created successfully',
    data: result,
  });
});

const getAllDoctorService = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, doctorServiceFilterableFields);

  const result = await DocService.getAllDoctorService(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor service data fetched successfully',
    data: result,
  });
});

const getSingleDoctorService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DocService.getSingleDoctorService(req?.params?.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Doctor service data fetched successfully',
      data: result,
    });
  }
);

export const DocServiceController = {
  createDoctorService,
  getAllDoctorService,
  getSingleDoctorService,
};
