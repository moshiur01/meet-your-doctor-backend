import { Doctor } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createDoctor = async (data: Doctor): Promise<Doctor> => {
  const result = prisma.doctor.create({
    data,
    include: {
      specialization: true,
    },
  });
  return result;
};

const getAllDoctor = async (): Promise<Doctor[] | null> => {
  const result = prisma.doctor.findMany({
    include: {
      specialization: true,
    },
  });
  return result;
};

const getSingleDoctor = async (id: string): Promise<Doctor | null> => {
  const result = prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      specialization: true,
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
