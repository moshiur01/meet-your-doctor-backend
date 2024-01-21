/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payment, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  paymentRelationalFields,
  paymentRelationalFieldsMapper,
} from './payment.constrain';
import { IPaymentFilterRequest } from './payment.interface';

const getAllPayment = async (
  options: IPaginationOptions,
  filters: IPaymentFilterRequest
): Promise<IGenericResponse<Payment[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  //*exact match
  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map(key => {
        //filter for relational fields
        if (paymentRelationalFields.includes(key)) {
          return {
            [paymentRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.PaymentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.payment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
      appointment: {
        include: {
          patient: true,
          doctor: {
            include: {
              specialization: true,
            },
          },
        },
      },
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

  const total = await prisma.payment.count({
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

const getSinglePayment = async (id: string): Promise<Payment | null> => {
  const result = await prisma.payment.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updatePayment = async (
  id: string,
  payload: Partial<Payment>
): Promise<Payment | null> => {
  const isExists = await getSinglePayment(id);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment data not Found');
  }

  const result = await prisma.payment.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

export const paymentService = {
  getAllPayment,
  getSinglePayment,
  updatePayment,
};
