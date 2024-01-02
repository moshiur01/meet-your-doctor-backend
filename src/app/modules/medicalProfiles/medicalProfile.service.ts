/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicalProfile, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  medicalProfileRelationFields,
  medicalProfileRelationFieldsMapper,
  medicalProfileSearchableFields,
} from './medicalProfile.constrain';
import { IMedicalProfileFilterRequest } from './medicalProfile.interface';

const getAllMedicalProfile = async (
  options: IPaginationOptions,
  filters: IMedicalProfileFilterRequest
): Promise<IGenericResponse<MedicalProfile[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  //*partial match

  if (searchTerm) {
    andConditions.push({
      OR: medicalProfileSearchableFields.map(field => ({
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
        if (medicalProfileRelationFields.includes(key)) {
          return {
            [medicalProfileRelationFieldsMapper[key]]: {
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

  const whereConditions: Prisma.MedicalProfileWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.medicalProfile.findMany({
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

  const total = await prisma.medicalProfile.count({
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

const getSingleMedicalProfile = async (
  id: string
): Promise<MedicalProfile | null> => {
  const result = await prisma.medicalProfile.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateMedicalProfile = async (
  id: string,
  payload: Partial<MedicalProfile>
): Promise<MedicalProfile | null> => {
  const result = await prisma.medicalProfile.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

export const medicalProfileService = {
  getAllMedicalProfile,
  getSingleMedicalProfile,
  updateMedicalProfile,
};
