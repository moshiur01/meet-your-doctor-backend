/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const loginUser = async (payload: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = payload;

  let isUserExist: any;
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { email },
  });
  const patient = await prisma.patient.findUnique({
    where: { email },
  });

  if (!admin && !patient && !doctor) {
    throw new Error('User does not exist');
  }

  if (admin || patient || doctor) {
    isUserExist = admin || patient || doctor;
  }

  if (isUserExist && isUserExist.password !== password) {
    throw new Error('Password is incorrect');
  }

  const payloadData = {
    id: isUserExist!.id,
    email: isUserExist!.email,
    role: isUserExist!.role,
    phoneNumber: isUserExist!.phoneNumber,
    name: isUserExist!.name,
    photo: isUserExist!.photo,
  };

  console.log(payloadData);

  //   create token
  const accessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }

  const decodedToken = jwtHelpers.decodeToken(token);
  const { email, role, phoneNumber, name, photo, id } = decodedToken;
  if (!email || !role || !phoneNumber || !name || !photo || !id) {
    throw new Error('Invalid token');
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { email },
  });
  const patient = await prisma.patient.findUnique({
    where: { email },
  });

  if (!admin && !patient && !doctor) {
    throw new Error('User does not exist');
  }
  const payloadData = {
    id: id,
    email: email,
    role: role,
    phoneNumber: phoneNumber,
    name: name,
    photo: photo,
  };
  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};
export const authServices = { loginUser, refreshToken };
