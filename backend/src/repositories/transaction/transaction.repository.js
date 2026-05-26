import prisma from "../../config/prisma.js";

export const createTransaction = async (data) => {
  return prisma.transaction.create({
    data,
  });
};

export const getTransactions = async (orgId, skip, take, filters) => {
  return prisma.transaction.findMany({
    where: {
      orgId,

      ...(filters.type && {
        type: filters.type,
      }),
    },

    skip,
    take,

    orderBy: {
      createdAt: "desc",
    },
  });
};
export const updateTransaction = async (id, orgId, data) => {
  return prisma.transaction.updateMany({
    where: {
      id,
      orgId,
    },
    data,
  });
};

export const deleteTransaction = async (id, orgId) => {
  return prisma.transaction.deleteMany({
    where: {
      id,
      orgId,
    },
  });
};
