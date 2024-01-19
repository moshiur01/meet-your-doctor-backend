import { Medicine } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const getAllMedicineStatus = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Medicine[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.medicine.findMany({
    where: {},
    include: {
      appointment: {
        include: {
          doctor: true,
          patient: true,
        },
      },
    },

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
  const total = await prisma.medicine.count({
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

const getSingleMedicineStatus = async (
  id: string
): Promise<Medicine | null> => {
  const result = prisma.medicine.findUnique({
    where: {
      appointmentId: id,
    },
    include: {
      appointment: true,
    },
  });
  return result;
};

const updateMedicineStatus = async (
  id: string,
  payload: Partial<Medicine>
): Promise<Medicine | null> => {
  const result = prisma.medicine.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const medicineService = {
  getSingleMedicineStatus,
  updateMedicineStatus,
  getAllMedicineStatus,
};
