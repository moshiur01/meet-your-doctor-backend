import { Doctor } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createDoctor = async (data: Doctor): Promise<Doctor> => {
  const result = prisma.doctor.create({
    data,
  });
  return result;
};

export const doctorService = {
  createDoctor,
};
