import { PrismaClient } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
      prisma: PrismaClient;
    }
  }
}

export interface CreateAccountInput {
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance?: number;
}

export interface CreateTransactionInput {
  amount: number;
  description?: string;
  date: string;
  type: 'income' | 'expense';
  accountId: string;
  categoryId?: string;
}