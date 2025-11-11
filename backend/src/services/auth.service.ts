import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/hash';
import { signToken } from '../utils/jwt';

export const registerService = async (prisma: PrismaClient, data: { email: string; password: string; name?: string }) => {
  const hashedPassword = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
  return { user, token: signToken({ id: user.id, email: user.email }) };
};

export const loginService = async (prisma: PrismaClient, email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  return { user, token: signToken({ id: user.id, email: user.email }) };
};