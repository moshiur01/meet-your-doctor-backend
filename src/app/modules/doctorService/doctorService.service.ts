/* eslint-disable @typescript-eslint/no-explicit-any */
import { DoctorService, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  doctorServiceRelationalFields,
  doctorServiceRelationalFieldsMapper,
} from './doctorService.constrain';
import { IDoctorServiceFilterRequest } from './doctorService.interface';

const createDoctorService = async (data: DoctorService) => {
  const result = await prisma.doctorService.create({
    data,
  });

  return result;
};

const getAllDoctorService = async (
  options: IPaginationOptions,
  filters: IDoctorServiceFilterRequest
): Promise<IGenericResponse<DoctorService[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  //*exact match
  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map(key => {
        //filter for relational fields
        if (doctorServiceRelationalFields.includes(key)) {
          return {
            [doctorServiceRelationalFieldsMapper[key]]: {
              id: (filters as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filters as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.DoctorServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctorService.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
      appointments: true,
      slot: true,
      doctor: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.doctorService.count({
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

const getSingleDoctorService = async (
  id: string
): Promise<DoctorService[] | null> => {
  const result = await prisma.doctorService.findMany({
    where: {
      doctorId: id,
    },
    include: {
      doctor: true,
      appointments: true,
      slot: true,
    },
  });
  return result;
};

export const DocService = {
  createDoctorService,
  getAllDoctorService,
  getSingleDoctorService,
};
