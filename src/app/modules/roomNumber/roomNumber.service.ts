/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, roomNumber } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { roomNumberSearchableFields } from './roomNumber.constrain';
import { IRoomNumberFilterRequest } from './roomNumber.interface';

const createRoomNumber = async (data: roomNumber): Promise<roomNumber> => {
  const result = await prisma.roomNumber.create({ data });
  return result;
};

const getAllRoomNumber = async (
  options: IPaginationOptions,
  filters: IRoomNumberFilterRequest
): Promise<IGenericResponse<roomNumber[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  //*partial match
  if (searchTerm) {
    andConditions.push({
      OR: roomNumberSearchableFields.map(field => ({
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

  const whereConditions: Prisma.roomNumberWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.roomNumber.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
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

  const total = await prisma.roomNumber.count({
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

const getNotBookedRoomNumbers = async (
  options: IPaginationOptions
): Promise<IGenericResponse<roomNumber[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.roomNumber.findMany({
    where: {
      isBooked: false,
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

  const total = await prisma.roomNumber.count({
    where: { isBooked: false },
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

const getSingleRoomNumber = async (id: string): Promise<roomNumber | null> => {
  const result = await prisma.roomNumber.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateRoomNumber = async (
  id: string,
  payload: Partial<roomNumber>
): Promise<Partial<roomNumber> | null> => {
  const result = await prisma.roomNumber.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteRoomNumber = async (id: string): Promise<roomNumber | null> => {
  const result = await prisma.roomNumber.delete({
    where: {
      id,
    },
  });
  return result;
};

export const roomNumberService = {
  createRoomNumber,
  getAllRoomNumber,
  getNotBookedRoomNumbers,
  getSingleRoomNumber,
  updateRoomNumber,
  deleteRoomNumber,
};
