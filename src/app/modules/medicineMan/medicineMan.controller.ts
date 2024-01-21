import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { medicineManFilterableFields } from './medicinMan.constrain';
import { medicineManServices } from './medicineMan.service';

const createMedicineMan = catchAsync(async (req: Request, res: Response) => {
  const result = await medicineManServices.createMedicineMan(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine Man Created Successfully',
    data: result,
  });
});

const getAllMedicineMan = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, medicineManFilterableFields);

  const result = await medicineManServices.getAllMedicineMan(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine men data fetched Successfully',
    data: result,
  });
});

const getSingleMedicineMan = catchAsync(async (req: Request, res: Response) => {
  const result = await medicineManServices.getSingleMedicineMan(
    req?.params?.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single medicine man data Successfully',
    data: result,
  });
});

const updateMedicineMan = catchAsync(async (req: Request, res: Response) => {
  const result = await medicineManServices.updateMedicineMan(
    req?.params?.id,
    req?.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine man data updated Successfully',
    data: result,
  });
});

const deleteMedicineMan = catchAsync(async (req: Request, res: Response) => {
  const result = await medicineManServices.deleteMedicineMan(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine man data deleted Successfully',
    data: result,
  });
});

export const medicineManController = {
  createMedicineMan,
  getAllMedicineMan,
  getSingleMedicineMan,
  updateMedicineMan,
  deleteMedicineMan,
};
