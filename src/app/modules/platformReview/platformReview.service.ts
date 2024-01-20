import { PlatformReview, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IPatientFilterRequest } from '../patients/patient.interface';
import { platformReviewSearchableFields } from './platformReviewConstrain';

const createPlatformReview = async (
  data: PlatformReview
): Promise<PlatformReview> => {
  const result = await prisma.platformReview.create({
    data,
  });

  return result;
};

const getAllPlatformReview = async (
  options: IPaginationOptions,
  filters: IPatientFilterRequest
): Promise<IGenericResponse<PlatformReview[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  const { searchTerm } = filters;

  //*partial match
  if (searchTerm) {
    andConditions.push({
      OR: platformReviewSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.PlatformReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.platformReview.findMany({
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
  const total = await prisma.platformReview.count({
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

const deletePlatformReview = async (id: string): Promise<PlatformReview> => {
  const result = await prisma.platformReview.delete({
    where: {
      id,
    },
  });

  return result;
};

export const platformReviewService = {
  createPlatformReview,
  getAllPlatformReview,
  deletePlatformReview,
};
