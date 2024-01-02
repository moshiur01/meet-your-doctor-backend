/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableDoctor, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  availableDoctorRelationalFields,
  availableDoctorRelationalFieldsMapper,
} from './availableDoctor.constrain';
import { IAvailableDoctorFilterRequest } from './availableDoctor.interface';

const createAvailableDoctor = async (
  availableDoctor: AvailableDoctor
): Promise<AvailableDoctor> => {
  const result = await prisma.availableDoctor.create({
    data: availableDoctor,
  });
  return result;
};

const getAllAvailableDoctor = async (
  options: IPaginationOptions,
  filters: IAvailableDoctorFilterRequest
): Promise<IGenericResponse<AvailableDoctor[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  //*exact match
  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map(key => {
        //filter for relational fields
        if (availableDoctorRelationalFields.includes(key)) {
          return {
            [availableDoctorRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.AvailableDoctorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.availableDoctor.findMany({
    where: whereConditions,
    skip,
    include: {
      doctor: {
        include: {
          availability: {
            include: {
              slot: true,
            },
          },
          specialization: {
            include: {
              service: true,
            },
          },
        },
      },
      availableServices: {
        include: {
          service: true,
          slot: true,
        },
      },
      slot: true,
    },
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

  const total = await prisma.availableDoctor.count({
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

const getSingleAvailableDoctor = async (
  id: string
): Promise<AvailableDoctor | null> => {
  const result = await prisma.availableDoctor.findUnique({
    where: {
      id: id,
    },
    include: {
      doctor: {
        include: {
          availability: {
            include: {
              slot: true,
            },
          },
          specialization: {
            include: {
              service: true,
            },
          },
        },
      },
      availableServices: {
        include: {
          service: true,
          slot: true,
        },
      },
      slot: true,
    },
  });
  return result;
};

const updateAvailableDoctor = async (
  id: string,
  availableDoctor: AvailableDoctor
): Promise<AvailableDoctor> => {
  const isExists = await getSingleAvailableDoctor(id);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not Found');
  }
  const result = await prisma.availableDoctor.update({
    where: {
      id: id,
    },
    data: availableDoctor,
  });
  return result;
};

const deleteAvailableDoctor = async (id: string): Promise<AvailableDoctor> => {
  const isExists = await getSingleAvailableDoctor(id);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not Found');
  }
  const result = await prisma.availableDoctor.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const availableDoctorServices = {
  createAvailableDoctor,
  getAllAvailableDoctor,
  getSingleAvailableDoctor,
  updateAvailableDoctor,
  deleteAvailableDoctor,
};
