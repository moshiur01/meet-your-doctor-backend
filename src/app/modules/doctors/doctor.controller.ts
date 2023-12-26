import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { doctorService } from './doctor.service';

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.createDoctor(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor created successfully',
    data: result,
  });
});

export const doctorController = {
  createDoctor,
};
