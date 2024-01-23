/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicineMan, Prisma } from '@prisma/client';
import hashPassword from '../../../helpers/hashPassword';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { medicineManSearchableFields } from './medicinMan.constrain';
import { IMedicineManFilterRequest } from './medicineMan.interface';

const createMedicineMan = async (data: MedicineMan): Promise<MedicineMan> => {
  const { password, ...restData } = data;

  //hash password
  const newPassword = await hashPassword(password);

  const result = await prisma.medicineMan.create({
    data: {
      ...restData,
      password: newPassword,
    },
  });

  return result;
};

const getAllMedicineMan = async (
  options: IPaginationOptions,
  filters: IMedicineManFilterRequest
): Promise<IGenericResponse<MedicineMan[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  //*partial match
  if (searchTerm) {
    andConditions.push({
      OR: medicineManSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  //*exact match
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.MedicineManWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.medicineMan.findMany({
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
  const total = await prisma.medicineMan.count({
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

const getSingleMedicineMan = async (
  id: string
): Promise<MedicineMan | null> => {
  const result = await prisma.medicineMan.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateMedicineMan = async (
  id: string,
  payload: Partial<MedicineMan>
): Promise<MedicineMan> => {
  const result = await prisma.medicineMan.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteMedicineMan = async (id: string): Promise<MedicineMan> => {
  const result = await prisma.medicineMan.delete({
    where: {
      id,
    },
  });

  return result;
};

export const medicineManServices = {
  createMedicineMan,
  getAllMedicineMan,
  getSingleMedicineMan,
  updateMedicineMan,
  deleteMedicineMan,
};
