import prisma from "../../config/prisma.js";

import {
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../../repositories/transaction/transaction.repository.js";

export const createUserTransaction = async (data, user) => {
  return prisma.$transaction(async (tx) => {
    return tx.transaction.create({
      data: {
        ...data,

        userId: user.userId,

        orgId: user.orgId,
      },
    });
  });
};

export const fetchTransactions = async (user, page, limit, filters) => {
  const skip = (page - 1) * limit;

  return getTransactions(
    user.orgId,

    user.userId,

    user.role,

    skip,

    limit,

    filters,
  );
};

export const updateUserTransaction = async (id, data, user) => {
  return updateTransaction(
    id,

    user.userId,

    data,
  );
};

export const removeTransaction = async (id, user) => {
  return deleteTransaction(
    id,

    user.userId,
  );
};
