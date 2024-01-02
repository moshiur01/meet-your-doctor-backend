import { AvailableService } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createAvailableService = async (data: AvailableService) => {
  const result = await prisma.availableService.create({
    data,
  });

  return result;
};

export const availableService_Service = {
  createAvailableService,
};
