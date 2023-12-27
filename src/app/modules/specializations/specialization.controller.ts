import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { specializationFilterableFields } from './specialization.constrain';
import { specializationServices } from './specialization.service';

const createSpecialization = catchAsync(async (req: Request, res: Response) => {
  const result = await specializationServices.createSpecialization(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specialization data created successfully',
    data: result,
  });
});

const getAllSpecializations = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields); //here
    const filters = pick(req.query, specializationFilterableFields);
    const result = await specializationServices.getAllSpecializations(
      options,
      filters
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specialization data fetched successfully',
      data: result,
    });
  }
);

const getSingleSpecialization = catchAsync(
  async (req: Request, res: Response) => {
    const result = await specializationServices.getSingleSpecialization(
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single specialization data fetched successfully',
      data: result,
    });
  }
);

const updateSpecialization = catchAsync(async (req: Request, res: Response) => {
  const result = await specializationServices.updateSpecialization(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specialization data updated successfully',
    data: result,
  });
});

const deleteSpecialization = catchAsync(async (req: Request, res: Response) => {
  const result = await specializationServices.deleteSpecialization(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specialization data deleted successfully',
    data: result,
  });
});

export const specializationController = {
  createSpecialization,
  getAllSpecializations,
  getSingleSpecialization,
  updateSpecialization,
  deleteSpecialization,
};
