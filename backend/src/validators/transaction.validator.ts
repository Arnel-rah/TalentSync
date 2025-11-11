import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number().min(0),
  description: z.string().optional(),
  date: z.string().datetime(),
  type: z.enum(['income', 'expense']),
  accountId: z.string(),
  categoryId: z.string().optional(),
});