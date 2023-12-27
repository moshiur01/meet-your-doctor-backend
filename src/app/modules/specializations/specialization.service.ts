import { Prisma, Specialization } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { specializationSearchableFields } from './specialization.constrain';
import { ISpecializationFilterRequest } from './specialization.interface';

const createSpecialization = async (
  data: Specialization
): Promise<Specialization> => {
  const result = await prisma.specialization.create({ data });
  return result;
};

const getAllSpecializations = async (
  options: IPaginationOptions,
  filters: ISpecializationFilterRequest
): Promise<IGenericResponse<Specialization[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];

  //*partial match
  if (searchTerm) {
    andConditions.push({
      OR: specializationSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.SpecializationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.specialization.findMany({
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

  const total = await prisma.specialization.count({
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

const getSingleSpecialization = async (
  id: string
): Promise<Specialization | null> => {
  const result = await prisma.specialization.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSpecialization = async (
  id: string,
  payload: Partial<Specialization>
): Promise<Partial<Specialization> | null> => {
  const result = await prisma.specialization.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteSpecialization = async (
  id: string
): Promise<Specialization | null> => {
  const result = await prisma.specialization.delete({
    where: {
      id,
    },
  });
  return result;
};

export const specializationServices = {
  createSpecialization,
  getAllSpecializations,
  getSingleSpecialization,
  updateSpecialization,
  deleteSpecialization,
};
