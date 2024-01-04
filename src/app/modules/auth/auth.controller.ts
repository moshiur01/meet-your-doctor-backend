/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req?.body;
  const result = await authServices.loginUser(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await authServices.refreshToken(token!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token generated successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
};
