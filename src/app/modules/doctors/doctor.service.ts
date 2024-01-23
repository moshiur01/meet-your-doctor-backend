/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doctor, Prisma } from '@prisma/client';
import hashPassword from '../../../helpers/hashPassword';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  doctorRelationalFields,
  doctorRelationalFieldsMapper,
  doctorSearchableFields,
} from './doctor.constrain';
import { IDoctorFilterRequest } from './doctor.interface';

const createDoctor = async (data: Doctor): Promise<any> => {
  const { password, ...restData } = data;

  //hash password
  const newPassword = await hashPassword(password);

  const result = prisma.doctor.create({
    data: {
      ...restData,
      password: newPassword,
    },
    include: {
      specialization: true,
    },
  });
  return result;
};

const getAllDoctor = async (
  filters: IDoctorFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Doctor[] | null>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // console.log(skip);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  //*partial match
  if (searchTerm) {
    andConditions.push({
      OR: doctorSearchableFields.map(field => ({
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
        if (doctorRelationalFields.includes(key)) {
          return {
            [doctorRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.DoctorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctor.findMany({
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
    include: {
      specialization: true,
      educations: true,
      experiences: true,
      appointments: true,
      timeSlots: true,
    },
  });

  const total = await prisma.doctor.count({
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

const getSingleDoctor = async (id: string): Promise<Doctor | null> => {
  const result = prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      specialization: true,
      appointments: true,
      doctorReviews: true,
      educations: true,
      experiences: true,
      timeSlots: true,
    },
  });
  return result;
};

const updateDoctor = async (
  id: string,
  payload: Partial<Doctor>
): Promise<Doctor | null> => {
  const result = prisma.doctor.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteDoctor = async (id: string): Promise<Doctor | null> => {
  const result = prisma.doctor.delete({
    where: {
      id,
    },
    include: {
      specialization: true,
    },
  });
  return result;
};

export const doctorService = {
  createDoctor,
  getAllDoctor,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
