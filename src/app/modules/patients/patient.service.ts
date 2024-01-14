/* eslint-disable @typescript-eslint/no-explicit-any */
import { Patient, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { patientSearchableFields } from './patient.constrain';
import { IPatientFilterRequest } from './patient.interface';

const CreatePatient = async (patient: Patient): Promise<any> => {
  const result = await prisma.patient.create({
    data: patient,
  });

  return result;
};

const getAllPatients = async (
  options: IPaginationOptions,
  filters: IPatientFilterRequest
): Promise<IGenericResponse<Patient[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  //*partial match
  if (filters.searchTerm) {
    andConditions.push({
      OR: patientSearchableFields.map(field => ({
        [field]: {
          contains: filters.searchTerm,
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

const getSinglePatient = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updatePatient = async (
  id: string,
  payload: Partial<Patient>
): Promise<any> => {
  const result = await prisma.patient.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const updatePatentPassword = async (
  id: string,
  payload: Partial<Patient>
): Promise<Patient> => {
  const result = await prisma.patient.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deletePatient = async (id: string): Promise<any> => {
  const result = await prisma.patient.delete({
    where: {
      id,
    },
  });

  return result;
};

export const patientService = {
  CreatePatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  updatePatentPassword,
  deletePatient,
};
