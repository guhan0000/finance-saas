import { createTransactionSchema } from "../../validations/transaction/transaction.validation.js";

import {
  createUserTransaction,
  fetchTransactions,
} from "../../services/transaction/transaction.service.js";

import { updateTransactionSchema } from "../../validations/transaction/transaction.validation.js";

import {
  updateUserTransaction,
  removeTransaction,
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

    const transactions = await fetchTransactions(req.user, page, limit, {
      type: req.query.type,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const validatedData = updateTransactionSchema.parse(req.body);

    const result = await updateUserTransaction(
      req.params.id,
      validatedData,
      req.user,
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await removeTransaction(req.params.id, req.user);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
