import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { availableDoctorFilterableFields } from './availableDoctor.constrain';
import { availableDoctorServices } from './availableDoctor.service';

const createAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableDoctorServices.createAvailableDoctor(
      req?.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available doctor data created successfully',
      data: result,
    });
  }
);

const getAllAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const filters = pick(req.query, availableDoctorFilterableFields);

    const result = await availableDoctorServices.getAllAvailableDoctor(
      options,
      filters
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available doctor data fetched successfully',
      data: result,
    });
  }
);

const getSingleAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableDoctorServices.getSingleAvailableDoctor(
      req?.params?.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single available doctor data fetched successfully',
      data: result,
    });
  }
);

const updateAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableDoctorServices.updateAvailableDoctor(
      req?.params?.id,
      req?.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single available doctor data updated successfully',
      data: result,
    });
  }
);

const deleteAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableDoctorServices.deleteAvailableDoctor(
      req?.params?.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single available doctor data deleted successfully',
      data: result,
    });
  }
);

export const availableDoctorController = {
  createAvailableDoctor,
  getAllAvailableDoctor,
  getSingleAvailableDoctor,
  updateAvailableDoctor,
  deleteAvailableDoctor,
};
