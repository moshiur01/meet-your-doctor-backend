/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableService, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  availableServiceRelationalFields,
  availableServiceRelationalFieldsMapper,
} from './availableService.constrain';
import { IAvailableServiceFilterRequest } from './availableService.interface';

const createAvailableService = async (data: AvailableService) => {
  const result = await prisma.availableService.create({
    data,
  });

  return result;
};

const getAllAvailableService = async (
  options: IPaginationOptions,
  filters: IAvailableServiceFilterRequest
): Promise<IGenericResponse<AvailableService[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  //*exact match
  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map(key => {
        //filter for relational fields
        if (availableServiceRelationalFields.includes(key)) {
          return {
            [availableServiceRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.AvailableServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.availableService.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
      service: {
        include: {
          specialization: true,
        },
      },
      doctor: true,
      appointments: {
        include: {
          patient: true,
          payment: true,
        },
      },

      slot: true,
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

  const total = await prisma.availableService.count({
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

const getSingleAvailableService = async (
  id: string
): Promise<AvailableService | null> => {
  const result = await prisma.availableService.findUnique({
    where: {
      id: id,
    },
    include: {
      service: {
        include: {
          specialization: true,
        },
      },
      doctor: true,
      appointments: {
        include: {
          patient: true,
          payment: true,
        },
      },
    },
  });
  return result;
};

const updateAvailableService = async (
  id: string,
  availableService: AvailableService
): Promise<AvailableService> => {
  const isExists = await getSingleAvailableService(id);

  if (!isExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Available Service data not found'
    );
  }

  const result = await prisma.availableService.update({
    where: {
      id: id,
    },
    data: availableService,
  });
  return result;
};

const deleteAvailableService = async (
  id: string
): Promise<AvailableService> => {
  const isExists = await getSingleAvailableService(id);

  if (!isExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Available Service data not found'
    );
  }
  const result = await prisma.availableService.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const availableService_Service = {
  createAvailableService,
  getAllAvailableService,
  getSingleAvailableService,
  updateAvailableService,
  deleteAvailableService,
};
