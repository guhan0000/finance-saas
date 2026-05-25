import { createTransactionSchema } from "../../validations/transaction/transaction.validation.js";

import {
  createUserTransaction,
  fetchTransactions,
} from "../../services/transaction/transaction.service.js";

export const create = async (req, res) => {
  try {
    const validatedData = createTransactionSchema.parse(req.body);

    const transaction = await createUserTransaction(validatedData, req.user);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const transactions = await fetchTransactions(req.user, page, limit);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
