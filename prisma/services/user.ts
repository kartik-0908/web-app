import client from '../index';
import { hashPassword, verifyPassword as verifyUserPassword } from '../../lib/auth';

export const findUserByEmail = async (email: string) => {
  return await client.user.findUnique({
    where: { email },
  });
};

export const createUser = async ({ email, password }: { email: string; password: string; }) => {
  const hashedPassword = await hashPassword(password);
  // console.log(hashedPassword)
  const resp = await client.user.create({
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
  await client.user.update({
    where: { email },
    data: { lastLoginAt: now },
  });
};

export const isShopInstalled = async (email: string) => {
  const shop = await client.shopify_installed_shop.findUnique({
    where: {
      email: email,
    },
  });

  return shop !== null;

}
