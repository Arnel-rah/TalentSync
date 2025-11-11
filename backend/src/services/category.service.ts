import { PrismaClient } from '@prisma/client';

export const createCategoryService = async (prisma: PrismaClient, data: { name: string; color?: string; userId: string }) => {
  return await prisma.category.create({
    data,
  });
};

export const getCategoriesService = async (prisma: PrismaClient, userId: string) => {
  return await prisma.category.findMany({ where: { userId } });
};