import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { medicineService } from './medicine.service';

const getAllMedicineStatus = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const result = await medicineService.getAllMedicineStatus(options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine data fetched successfully',
    data: result,
  });
});

const getSingleMedicineStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await medicineService.getSingleMedicineStatus(
      req?.params?.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Medicine data fetched successfully',
      data: result,
    });
  }
);

const updateSingleMedicineStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await medicineService.updateMedicineStatus(
      req?.params?.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Medicine data updated successfully',
      data: result,
    });
  }
);

export const medicineController = {
  getSingleMedicineStatus,
  getAllMedicineStatus,
  updateSingleMedicineStatus,
};
