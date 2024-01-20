import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { platformReviewService } from './platformReview.service';
import { platformReviewFilterableFields } from './platformReviewConstrain';

const createPlatformReview = catchAsync(async (req: Request, res: Response) => {
  const result = await platformReviewService.createPlatformReview(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Platform Review Created Successfully',
    data: result,
  });
});

const getAllPlatformReview = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, platformReviewFilterableFields);

  const result = await platformReviewService.getAllPlatformReview(
    options,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Platform review data fetched successfully',
    data: result,
  });
});

const deletePlatformReview = catchAsync(async (req: Request, res: Response) => {
  const result = await platformReviewService.deletePlatformReview(
    req?.params?.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Platform review data deleted Successfully',
    data: result,
  });
});

export const platformReviewController = {
  createPlatformReview,
  getAllPlatformReview,
  deletePlatformReview,
};
