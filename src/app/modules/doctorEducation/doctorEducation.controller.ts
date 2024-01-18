import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { doctorEducationService } from './doctorEducation.service';

const createDoctorEducation = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorEducationService.createDoctorEducation(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor Education data created successfully',
      data: result,
    });
  }
);

const getAllDoctorEducation = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorEducationService.getAllDoctorEducation();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctors education data fetched successfully',
      data: result,
    });
  }
);

const getSingleDoctorEducation = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorEducationService.getSingleDoctorEducation(
      req?.params?.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single doctor education data fetched successfully',
      data: result,
    });
  }
);

const getSingleSpecificDoctorEducation = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await doctorEducationService.getSingleSpecificDoctorEducation(
        req?.params?.id
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single  specific doctor education data fetched successfully',
      data: result,
    });
  }
);

const updateDoctorEducation = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorEducationService.updateDoctorEducation(
      req?.params?.id,
      req?.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor education data updated successfully',
      data: result,
    });
  }
);

const deleteDoctorEducation = catchAsync(
  async (req: Request, res: Response) => {
    const result = await doctorEducationService.deleteDoctorEducation(
      req?.params?.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor education data deleted successfully',
      data: result,
    });
  }
);

export const doctorEducationController = {
  createDoctorEducation,
  getSingleDoctorEducation,
  getSingleSpecificDoctorEducation,
  getAllDoctorEducation,
  updateDoctorEducation,
  deleteDoctorEducation,
};
