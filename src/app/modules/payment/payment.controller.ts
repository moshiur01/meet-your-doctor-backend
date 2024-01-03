import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paymentService } from './payement.service';
import { paymentFilterableFields } from './payment.constrain';

const getAllPayment = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, paymentFilterableFields);

  const result = await paymentService.getAllPayment(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment data fetched successfully',
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.getSinglePayment(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single payment data fetched successfully',
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.updatePayment(req?.params?.id, req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment data updated successfully',
    data: result,
  });
});

export const paymentController = {
  getAllPayment,
  getSinglePayment,
  updatePayment,
};
