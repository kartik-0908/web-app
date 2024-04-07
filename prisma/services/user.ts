// src/lib/user.ts
import { PrismaClient } from '@prisma/client';
import { hashPassword, verifyPassword as verifyUserPassword } from '../../lib/auth';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async ({  email, password }: { email: string; password: string; }) => {
  const hashedPassword = await hashPassword(password);
  // console.log(hashedPassword)
  const resp =  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  console.log(resp);
  return resp;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await verifyUserPassword(password, hashedPassword);
};

export const updateLastLoginAt = async (email: string) => {
  const now = new Date();
  await prisma.user.update({
    where: { email },
    data: { lastLoginAt: now },
  });
};
