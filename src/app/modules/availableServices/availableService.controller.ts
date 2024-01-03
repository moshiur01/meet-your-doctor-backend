import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { availableServiceFilterableFields } from './availableService.constrain';
import { availableService_Service } from './availableService.service';

const createAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableService_Service.createAvailableService(
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available service created successfully',
      data: result,
    });
  }
);

const getAllAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const filters = pick(req.query, availableServiceFilterableFields);

    const result = await availableService_Service.getAllAvailableService(
      options,
      filters
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available service data fetched successfully',
      data: result,
    });
  }
);

const getSingleAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableService_Service.getSingleAvailableService(
      req?.params?.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Available service data fetched successfully',
      data: result,
    });
  }
);

const updateAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableService_Service.updateAvailableService(
      req?.params?.id,
      req?.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available service data updated successfully',
      data: result,
    });
  }
);

const deleteAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableService_Service.deleteAvailableService(
      req?.params?.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available service data deleted successfully',
      data: result,
    });
  }
);

export const AvailableServiceController = {
  createAvailableService,
  getAllAvailableService,
  getSingleAvailableService,
  updateAvailableService,
  deleteAvailableService,
};
