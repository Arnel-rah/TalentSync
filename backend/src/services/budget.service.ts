import { PrismaClient } from '@prisma/client';

export const createBudgetService = async (prisma: PrismaClient, data: { month: number; year: number; amount: number; categoryId: string; userId: string }) => {
  return await prisma.budget.create({
    data,
    include: { category: true },
  });
};

export const getBudgetsService = async (prisma: PrismaClient, userId: string, month: number, year: number) => {
  return await prisma.budget.findMany({
    where: { userId, month, year },
    include: { category: true },
  });
};