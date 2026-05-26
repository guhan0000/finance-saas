import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z.string().min(2),

  amount: z.number().positive(),

  type: z.enum(["INCOME", "EXPENSE"]),

  categoryId: z.string(),
});

export const updateTransactionSchema = z.object({
  title: z.string().min(2).optional(),

  amount: z.number().positive().optional(),

  type: z.enum(["INCOME", "EXPENSE"]).optional(),

  categoryId: z.string().optional(),
});
