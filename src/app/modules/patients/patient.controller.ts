import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { patientFilterableFields } from './patient.constrain';
import { patientService } from './patient.service';

const cratePatient = catchAsync(async (req: Request, res: Response) => {
  const { medicalProfile, ...patientData } = req.body;

  const result = await patientService.CreatePatient(
    patientData,
    medicalProfile
  );

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

export const patientController = {
  cratePatient,
  getAllPatients,
};
