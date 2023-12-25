import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { specializationServices } from './specialization.service';

const createSpecialization = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const result = await specializationServices.createSpecialization(data);
    res.status(200).json({
      status: 200,
      message: 'Specialization created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'something went wrong',
      error,
    });
  }
};

const getAllSpecializations = catchAsync(
  async (req: Request, res: Response) => {
    const result = await specializationServices.getAllSpecializations();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicDepartments fetched successfully',
      data: result,
    });
  }
);

export const specializationController = {
  createSpecialization,
  getAllSpecializations,
};
