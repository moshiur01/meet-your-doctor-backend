import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { doctorReviewFilterableFields } from './review.constrain';
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
  const filters = pick(req.query, doctorReviewFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await doctorReviewService.getAllDoctorReview(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' All Doctor review data fetched successfully',
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

const deleteDoctorReview = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorReviewService.deleteDoctorReview(req.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor review data deleted successfully',
    data: result,
  });
});

export const doctorReviewController = {
  createDoctorReview,
  getAllDoctorReview,
  getSpecificDoctorReview,
  deleteDoctorReview,
};
