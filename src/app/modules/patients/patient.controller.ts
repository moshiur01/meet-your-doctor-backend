import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { patientFilterableFields } from './patient.constrain';
import { patientService } from './patient.service';

const cratePatient = catchAsync(async (req: Request, res: Response) => {
  const result = await patientService.CreatePatient(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient Created Successfully',
    data: result,
  });
});

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const filters = pick(req.query, patientFilterableFields);

  const result = await patientService.getAllPatients(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patients data fetched Successfully',
    data: result,
  });
});

const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
  const result = await patientService.getSinglePatient(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single patient data Successfully',
    data: result,
  });
});

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const result = await patientService.updatePatient(req?.params?.id, req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient data updated Successfully',
    data: result,
  });
});

const updatePatentPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await patientService.updatePatentPassword(
    req?.params?.id,
    req?.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient password updated Successfully',
    data: result,
  });
});

const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const result = await patientService.deletePatient(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient data deleted Successfully',
    data: result,
  });
});

export const patientController = {
  cratePatient,
  getAllPatients,
  getSinglePatient,
  updatePatentPassword,
  updatePatient,
  deletePatient,
};
