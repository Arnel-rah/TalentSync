import { z } from 'zod';

export const createBudgetSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2020),
  amount: z.number().min(0),
  categoryId: z.string(),
});