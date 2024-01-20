/* eslint-disable @typescript-eslint/no-explicit-any */
import { Admin, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { adminSearchableFields } from './admin.constrain';
import { IAdminFilterRequest } from './admin.interface';

const createAdmin = async (data: Admin): Promise<Admin> => {
  const result = prisma.admin.create({
    data,
  });
  return result;
};

const getAllAdmin = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Admin[] | null>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // console.log(skip);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  //*partial match
  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map(field => ({
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

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
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

  const total = await prisma.admin.count({
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

const getSingleAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateAdmin = async (id: string, admin: Admin): Promise<Admin> => {
  const isExists = await getSingleAdmin(id);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin data not found');
  }

  const result = await prisma.admin.update({
    where: {
      id: id,
    },
    data: admin,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<Admin> => {
  const isExists = await getSingleAdmin(id);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin data not found');
  }
  const result = await prisma.admin.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const adminService = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
