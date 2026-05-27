import prisma from "../../config/prisma.js";

export const createTransaction = async (data) => {
  return prisma.transaction.create({
    data,
  });
};

export const getTransactions = async (orgId, userId, role) => {
  return prisma.transaction.findMany({
    where:
      role === "USER"
        ? {
            userId,
          }
        : {
            orgId,
          },

    include: {
      category: true,
    },

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
