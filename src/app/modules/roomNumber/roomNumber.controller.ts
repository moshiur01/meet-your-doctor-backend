import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomNumberFilterableFields } from './roomNumber.constrain';
import { roomNumberService } from './roomNumber.service';

const createRoomNumber = catchAsync(async (req: Request, res: Response) => {
  const result = await roomNumberService.createRoomNumber(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room number created successfully',
    data: result,
  });
});

const getAllRoomNumber = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, roomNumberFilterableFields);
  const result = await roomNumberService.getAllRoomNumber(options, filters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room number data fetched successfully',
    data: result,
  });
});

const getNotBookedRoomNumbers = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);

    const result = await roomNumberService.getNotBookedRoomNumbers(options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Not Booked Room number data fetched successfully',
      data: result,
    });
  }
);

const getSingleRoomNumber = catchAsync(async (req: Request, res: Response) => {
  const result = await roomNumberService.getSingleRoomNumber(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single room number data fetched successfully',
    data: result,
  });
});

const updateRoomNumber = catchAsync(async (req: Request, res: Response) => {
  const result = await roomNumberService.updateRoomNumber(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room number data updated successfully',
    data: result,
  });
});

const deleteRoomNumber = catchAsync(async (req: Request, res: Response) => {
  const result = await roomNumberService.deleteRoomNumber(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room number data deleted successfully',
    data: result,
  });
});

export const roomNumberController = {
  createRoomNumber,
  getAllRoomNumber,
  getNotBookedRoomNumbers,
  getSingleRoomNumber,
  updateRoomNumber,
  deleteRoomNumber,
};
