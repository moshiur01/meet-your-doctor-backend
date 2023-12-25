import { Specialization } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createSpecialization = async (
  data: Specialization
): Promise<Specialization> => {
  const result = await prisma.specialization.create({ data });
  return result;
};

const getAllSpecializations = async (): Promise<Specialization[]> => {
  const result = await prisma.specialization.findMany({});
  return result;
};
export const specializationServices = {
  createSpecialization,
  getAllSpecializations,
};
