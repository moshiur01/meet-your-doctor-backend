import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './service.constrain';
import { Services_Service } from './service.service';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await Services_Service.createService(req?.body);

  sendResponse(res, {
    statusCode: httpStatus?.OK,
    success: true,
    message: 'Services created successfully',
    data: result,
  });
});

const getAllService = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, serviceFilterableFields);

  const result = await Services_Service.getAllService(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service data fetched successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const result = await Services_Service.getSingleService(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single service data fetched successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const result = await Services_Service.updateService(
    req?.params?.id,
    req?.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service data updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await Services_Service.deleteService(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service data deleted successfully',
    data: result,
  });
});

export const serviceController = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
