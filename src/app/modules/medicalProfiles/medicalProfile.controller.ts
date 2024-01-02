import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { medicalProfileFilterableFields } from './medicalProfile.constrain';
import { medicalProfileService } from './medicalProfile.service';

const getAllMedicalProfile = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, medicalProfileFilterableFields);

  const result = await medicalProfileService.getAllMedicalProfile(
    options,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medical profile data fetched Successfully',
    data: result,
  });
});

const getSingleMedicalProfile = catchAsync(
  async (req: Request, res: Response) => {
    const result = await medicalProfileService.getSingleMedicalProfile(
      req?.params?.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single medical profile data Successfully',
      data: result,
    });
  }
);

const updateMedicalProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await medicalProfileService.updateMedicalProfile(
    req?.params?.id,
    req?.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medical profile data updated Successfully',
    data: result,
  });
});

export const medicalProfileController = {
  getAllMedicalProfile,
  getSingleMedicalProfile,
  updateMedicalProfile,
};
