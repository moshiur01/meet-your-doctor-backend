/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  serviceRelationalFields,
  serviceRelationalFieldsMapper,
  serviceSearchableFields,
} from './service.constrain';
import { IServiceFilterRequest } from './service.interface';

const createService = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
  });

  return result;
};

const getAllService = async (
  options: IPaginationOptions,
  filters: IServiceFilterRequest
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  //*partial match
  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
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
        //filter for relational fields
        if (serviceRelationalFields.includes(key)) {
          return {
            [serviceRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    where: whereConditions,
    include: {
      specialization: true,
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

  const total = await prisma.service.count({
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

const getSingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      specialization: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  return result;
};

const updateService = async (
  id: string,
  payload: Partial<Service>
): Promise<Service | null> => {
  const service = await getSingleService(id);

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteService = async (id: string): Promise<Service | null> => {
  const service = await getSingleService(id);

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });

  return result;
};

export const Services_Service = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
