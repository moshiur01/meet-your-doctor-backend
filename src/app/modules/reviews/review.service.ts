/* eslint-disable @typescript-eslint/no-explicit-any */
import { DoctorReview } from '@prisma/client';
import prisma from '../../../shared/prisma';

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
      throw new Error('Doctor not found');
    }

    // Calculate updated totalRating and numberOfReviews
    const updatedTotalRating = doctorData.avgRating + data.rating;
    const updatedNumberOfReviews = doctorData.totalRating + 1;

    // Calculate updated averageRating
    const updatedAverageRating = updatedTotalRating / updatedNumberOfReviews;

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
  id: string
): Promise<DoctorReview[] | null> => {
  const result = prisma.doctorReview.findMany({
    where: {
      id,
    },
    include: {
      doctor: true,
      patient: true,
    },
  });
  return result;
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

export const doctorReviewService = {
  createDoctorReview,
  getAllDoctorReview,
  getSpecificDoctorReview,
};
