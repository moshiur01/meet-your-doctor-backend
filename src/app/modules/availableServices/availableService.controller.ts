import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const AvailableServiceController = {
  createAvailableService,
};
