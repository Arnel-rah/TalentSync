import { PrismaClient } from '@prisma/client';

export const createAccountService = async (prisma: PrismaClient, data: { name: string; type: string; balance?: number; userId: string }) => {
  return await prisma.account.create({
    data: {
      ...data,
      balance: data.balance ?? 0,
    },
  });
};

export const getAccountsService = async (prisma: PrismaClient, userId: string) => {
  return await prisma.account.findMany({
    where: { userId },
    include: { transactions: true },
  });
};