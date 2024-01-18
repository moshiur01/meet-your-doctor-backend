import { Experience } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createDoctorExperience = async (
  data: Experience
): Promise<Experience> => {
  const result = prisma.experience.create({
    data,
  });
  return result;
};

const getAllDoctorExperience = async (): Promise<Experience[] | null> => {
  const result = prisma.experience.findMany({
    where: {},
    include: {
      doctor: true,
    },
  });
  return result;
};
const getSingleDoctorExperience = async (
  id: string
): Promise<Experience | null> => {
  const result = prisma.experience.findUnique({
    where: {
      id,
    },
    include: {
      doctor: true,
    },
  });
  return result;
};

const getSingleSpecificDoctorExperience = async (
  id: string
): Promise<Experience[] | null> => {
  const result = prisma.experience.findMany({
    where: {
      doctorId: id,
    },
    include: {
      doctor: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return result;
};

const updateDoctorExperience = async (
  id: string,
  payload: Partial<Experience>
): Promise<Experience | null> => {
  const result = prisma.experience.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteDoctorExperience = async (
  id: string
): Promise<Experience | null> => {
  const result = prisma.experience.delete({
    where: {
      id,
    },
  });
  return result;
};

export const doctorExperienceService = {
  createDoctorExperience,
  getAllDoctorExperience,
  getSingleDoctorExperience,
  getSingleSpecificDoctorExperience,
  updateDoctorExperience,
  deleteDoctorExperience,
};
