import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { doctorExperienceService } from './doctorExperience.service';

const createDoctorExperience = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorExperienceService.createDoctorExperience(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor Experience data created successfully',
      data: result,
    });
  }
);

const getAllDoctorExperience = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorExperienceService.getAllDoctorExperience();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctors experience data fetched successfully',
      data: result,
    });
  }
);

const getSingleDoctorExperience = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorExperienceService.getSingleDoctorExperience(
      req?.params?.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single doctor experience data fetched successfully',
      data: result,
    });
  }
);

const getSingleSpecificDoctorExperience = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await doctorExperienceService.getSingleSpecificDoctorExperience(
        req?.params?.id
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single specific doctor experience data fetched successfully',
      data: result,
    });
  }
);

const updateDoctorExperience = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorExperienceService.updateDoctorExperience(
      req?.params?.id,
      req?.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor experience data updated successfully',
      data: result,
    });
  }
);

const deleteDoctorExperience = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorExperienceService.deleteDoctorExperience(
      req?.params?.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor experience data deleted successfully',
      data: result,
    });
  }
);

export const doctorExperienceController = {
  createDoctorExperience,
  getSingleDoctorExperience,
  getSingleSpecificDoctorExperience,
  getAllDoctorExperience,
  updateDoctorExperience,
  deleteDoctorExperience,
};
