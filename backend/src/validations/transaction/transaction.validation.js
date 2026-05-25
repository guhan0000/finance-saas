import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z.string().min(2),

  amount: z.number().positive(),

  type: z.enum(["INCOME", "EXPENSE"]),

  categoryId: z.string(),
});
