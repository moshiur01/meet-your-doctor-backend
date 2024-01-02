import { TimeSlot } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const createTimeSlot = async (payload: TimeSlot): Promise<TimeSlot> => {
  const result = await prisma.timeSlot.create({
    data: payload,
  });
  return result;
};

const getAllTimeSlot = async (
  options: IPaginationOptions
): Promise<IGenericResponse<TimeSlot[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.timeSlot.findMany({
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

  const total = await prisma.timeSlot.count({
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

const getSingleTimeSlot = async (id: string): Promise<TimeSlot | null> => {
  const result = await prisma.timeSlot.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateTimeSlot = async (
  id: string,
  payload: Partial<TimeSlot>
): Promise<TimeSlot | null> => {
  const isExists = await getSingleTimeSlot(id);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Time slot data not found');
  }

  const result = await prisma.timeSlot.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteTimeSlot = async (id: string): Promise<TimeSlot | null> => {
  const isExists = await getSingleTimeSlot(id);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Time slot data not found');
  }
  const result = await prisma.timeSlot.delete({
    where: {
      id,
    },
  });

  return result;
};

export const timeSlotService = {
  createTimeSlot,
  getAllTimeSlot,
  getSingleTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
