import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { doctorReviewService } from './review.service';

const createDoctorReview = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorReviewService.createDoctorReview(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor review created successfully',
    data: result,
  });
});

const getAllDoctorReview = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorReviewService.getAllDoctorReview(req.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor review data fetched successfully',
    data: result,
  });
});

const getSpecificDoctorReview = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorReviewService.getSpecificDoctorReview(
      req.params?.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specific Doctor review data fetched successfully',
      data: result,
    });
  }
);

export const doctorReviewController = {
  createDoctorReview,
  getAllDoctorReview,
  getSpecificDoctorReview,
};
