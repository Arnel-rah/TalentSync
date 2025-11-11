import { PrismaClient } from '@prisma/client';

export const createTransactionService = async (prisma: PrismaClient, data: { amount: number; description?: string; date: Date; type: string; accountId: string; categoryId?: string; userId: string }) => {
  // Update account balance
  const transaction = await prisma.transaction.create({
    data,
    include: { account: true, category: true },
  });

  const balanceUpdate = data.type === 'income' ? { increment: data.amount } : { decrement: data.amount };
  await prisma.account.update({
    where: { id: data.accountId },
    data: { balance: balanceUpdate },
  });

  // Update budget spent if category
  if (data.categoryId) {
    const month = data.date.getMonth() + 1;
    const year = data.date.getFullYear();
    await prisma.budget.updateMany({
      where: { categoryId: data.categoryId, userId: data.userId, month, year },
      data: { spent: { increment: data.amount } },
    });
  }

  return transaction;
};