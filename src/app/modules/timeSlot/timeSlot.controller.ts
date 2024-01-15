import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { timeSlotService } from './timeSlot.service';

const createTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await timeSlotService.createTimeSlot(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Time slot created successfully',
    data: result,
  });
});

const getAllTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);

  const result = await timeSlotService.getAllTimeSlot(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Time slot data fetched successfully',
    data: result,
  });
});

const getSingleTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await timeSlotService.getSingleTimeSlot(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single time slot data fetched successfully',
    data: result,
  });
});

const getSingleTimeSlotForDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const result = await timeSlotService.getSingleTimeSlotForDoctor(
      req?.params?.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single time slot data  for doctor fetched successfully',
      data: result,
    });
  }
);

const updateTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await timeSlotService.updateTimeSlot(
    req?.params?.id,
    req?.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Time slot data updated successfully',
    data: result,
  });
});

const deleteTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await timeSlotService.deleteTimeSlot(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Time slot data deleted successfully',
    data: result,
  });
});

export const timeSlotController = {
  createTimeSlot,
  getAllTimeSlot,
  getSingleTimeSlot,
  getSingleTimeSlotForDoctor,
  updateTimeSlot,
  deleteTimeSlot,
};
