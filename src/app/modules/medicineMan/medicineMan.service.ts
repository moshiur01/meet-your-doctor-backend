import { MedicineMan } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const createMedicineMan = async (data: MedicineMan): Promise<MedicineMan> => {
  const result = prisma.medicineMan.create({
    data,
  });
  return result;
};

const getAllMedicineMan = async (
  options: IPaginationOptions
): Promise<IGenericResponse<MedicineMan[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.medicineMan.findMany({
    where: {},

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
    where: {},
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

export const medicineManServices = {
  createMedicineMan,
  getAllMedicineMan,
  getSingleMedicineMan,
  updateMedicineMan,
};
