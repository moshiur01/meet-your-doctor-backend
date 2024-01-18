import { Education } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createDoctorEducation = async (data: Education): Promise<Education> => {
  const result = prisma.education.create({
    data,
  });
  return result;
};

const getAllDoctorEducation = async (): Promise<Education[] | null> => {
  const result = prisma.education.findMany({
    where: {},
    include: {
      doctor: true,
    },
  });
  return result;
};

const getSingleDoctorEducation = async (
  id: string
): Promise<Education | null> => {
  const result = prisma.education.findUnique({
    where: {
      id,
    },
    include: {
      doctor: true,
    },
  });
  return result;
};

const getSingleSpecificDoctorEducation = async (
  id: string
): Promise<Education[] | null> => {
  const result = prisma.education.findMany({
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

const updateDoctorEducation = async (
  id: string,
  payload: Partial<Education>
): Promise<Education | null> => {
  const result = prisma.education.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteDoctorEducation = async (id: string): Promise<Education | null> => {
  const result = prisma.education.delete({
    where: {
      id,
    },
  });
  return result;
};

export const doctorEducationService = {
  createDoctorEducation,
  getSingleDoctorEducation,
  getSingleSpecificDoctorEducation,
  getAllDoctorEducation,
  updateDoctorEducation,
  deleteDoctorEducation,
};
