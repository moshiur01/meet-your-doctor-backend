/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import checkPassword from '../../../helpers/checkPassword';
import hashPassword from '../../../helpers/hashPassword';
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

  const medicineMan = await prisma.medicineMan.findUnique({
    where: { email },
  });

  if (!admin && !patient && !doctor && !medicineMan) {
    throw new Error('User does not exist');
  }

  if (admin || patient || doctor || medicineMan) {
    isUserExist = admin || patient || doctor || medicineMan;
  }

  if (
    isUserExist.password &&
    !(await checkPassword(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const payloadData = {
    id: isUserExist!.id,
    email: isUserExist!.email,
    role: isUserExist!.role,
    phoneNumber: isUserExist!.phoneNumber,
    name: isUserExist!.name,
    photo: isUserExist!.photo,
  };

  // console.log(payloadData);

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

  const medicineMan = await prisma.medicineMan.findUnique({
    where: { email },
  });

  if (!admin && !patient && !doctor && !medicineMan) {
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

const updatePassword = async (id: string, payload: any): Promise<any> => {
  const { oldPassword, newPassword } = payload;

  let isUserExist: any;

  const admin = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { id },
  });

  const medicineMan = await prisma.medicineMan.findUnique({
    where: { id },
  });

  if (!admin && !doctor && !medicineMan) {
    throw new Error('User does not exist');
  }

  if (admin || doctor || medicineMan) {
    isUserExist = admin || doctor || medicineMan;
  }

  if (
    isUserExist.password &&
    !(await checkPassword(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const hashedPassword = await hashPassword(newPassword);

  if (admin) {
    const result = await prisma.admin.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });

    return result;
  } else if (doctor) {
    const result = await prisma.doctor.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
    return result;
  } else {
    const result = await prisma.medicineMan.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
    return result;
  }
};

export const authServices = { loginUser, refreshToken, updatePassword };
