/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DoctorReview, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  doctorReviewRelationalFields,
  doctorReviewRelationalFieldsMapper,
} from './review.constrain';
import { IDoctorReviewFilterRequest } from './review.interface';

const createDoctorReview = async (data: DoctorReview): Promise<any> => {
  const rating = await prisma.$transaction(async transactionClient => {
    // Create doctor review
    const doctorRating = await transactionClient.doctorReview.create({
      data,
    });

    // Fetch doctor data
    const doctorData = await transactionClient.doctor.findUnique({
      where: {
        id: data?.doctorId,
      },
    });

    if (!doctorData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
    }

    const updatedNumberOfReviews = doctorData.totalRating + 1;

    //fetch specific doctor all reviews
    const specificDoctorReview = await prisma.doctorReview.findMany({
      where: {
        doctorId: doctorData?.id,
      },
      include: {
        doctor: true,
      },
    });

    let totalRating: number;
    let updatedAverageRating: number;

    if (specificDoctorReview?.length === 0) {
      totalRating = data?.rating;
      //@ts-ignore
      // eslint-disable-next-line prefer-const
      updatedAverageRating = totalRating / updatedNumberOfReviews;
    } else {
      // eslint-disable-next-line prefer-const
      totalRating = specificDoctorReview?.reduce(
        (accumulator: number, currentValue: { rating: number }) =>
          accumulator + currentValue?.rating,
        0
      );

      //@ts-ignore
      // eslint-disable-next-line prefer-const
      updatedAverageRating =
        (totalRating + data?.rating) / updatedNumberOfReviews;
    }
    // console.log(specificDoctorReview);

    // console.log(totalRating);

    // Update doctor model
    await transactionClient.doctor.update({
      where: {
        id: data?.doctorId,
      },
      data: {
        totalRating: updatedNumberOfReviews,
        avgRating: updatedAverageRating,
      },
    });

    return doctorRating;
  });

  return rating;
};

const getAllDoctorReview = async (
  filters: IDoctorReviewFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<DoctorReview[] | null>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const andConditions = [];

  //*exact match
  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map(key => {
        if (doctorReviewRelationalFields.includes(key)) {
          return {
            [doctorReviewRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.DoctorReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.doctorReview.findMany({
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
      doctor: true,
      patient: true,
    },
  });

  const total = await prisma.doctorReview.count({
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

const getSpecificDoctorReview = async (
  id: string
): Promise<DoctorReview[] | null> => {
  const result = prisma.doctorReview.findMany({
    where: {
      doctorId: id,
    },
    include: {
      doctor: true,
      patient: true,
    },
  });
  return result;
};

const deleteDoctorReview = async (doctorReviewId: string): Promise<any> => {
  const deletedRating = await prisma.$transaction(async transactionClient => {
    // Fetch doctor review data
    const doctorReviewData = await transactionClient.doctorReview.findUnique({
      where: {
        id: doctorReviewId,
      },
      include: {
        doctor: true,
      },
    });

    if (!doctorReviewData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Doctor  review not found');
    }

    //fetch specific doctor all reviews
    const specificDoctorReview = await getSpecificDoctorReview(
      doctorReviewData?.doctor?.id
    );

    // console.log(specificDoctorReview);

    const totalRating = specificDoctorReview?.reduce(
      (accumulator: number, currentValue: { rating: number }) =>
        accumulator + currentValue?.rating,
      0
    );

    const updatedTotalRating =
      //@ts-ignore
      totalRating - doctorReviewData?.rating;

    const updatedNumberOfReviews = doctorReviewData.doctor.totalRating - 1;

    const updatedAverageRating =
      //@ts-ignore
      updatedTotalRating / updatedNumberOfReviews;

    // Update doctor model
    await transactionClient.doctor.update({
      where: {
        id: doctorReviewData?.doctor.id,
      },
      data: {
        totalRating: updatedNumberOfReviews,
        avgRating: updatedAverageRating,
      },
    });

    // Delete doctor review
    await transactionClient.doctorReview.delete({
      where: {
        id: doctorReviewId,
      },
    });

    return doctorReviewData;
  });

  return deletedRating;
};

export const doctorReviewService = {
  createDoctorReview,
  getAllDoctorReview,
  getSpecificDoctorReview,
  deleteDoctorReview,
};
