import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constrain';
import { adminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.createAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, adminFilterableFields);
  const result = await adminService.getAllAdmin(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data fetched successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getSingleAdmin(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single admin data fetched successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.updateAdmin(req?.params?.id, req?.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.deleteAdmin(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single admin data deleted successfully',
    data: result,
  });
});

export const adminController = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
