/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicalProfile, Patient, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { patientSearchableFields } from './patient.constrain';
import { IPatientFilterRequest } from './patient.interface';

const CreatePatient = async (
  patient: Patient,
  medicalProfile: MedicalProfile
): Promise<any> => {
  const result = await prisma.$transaction(async transactorClient => {
    const createPatient = await transactorClient.patient.create({
      data: patient,
    });

    const createMedicalProfile = await transactorClient.medicalProfile.create({
      data: {
        ...medicalProfile,
        patientId: createPatient?.id,
        profileStatus: true,
      },
    });
    return {
      patient: createPatient,
      medical: createMedicalProfile,
    };
  });

  return result;
};

const getAllPatients = async (
  options: IPaginationOptions,
  filters: IPatientFilterRequest
): Promise<IGenericResponse<Patient[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm } = filters;

  const andConditions = [];

  //*partial match
  if (searchTerm) {
    andConditions.push({
      OR: patientSearchableFields.map(field => ({
        [field]: {
          contains: filters,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const patientService = {
  CreatePatient,
  getAllPatients,
};
