import prisma from "../../config/prisma.js";

export const createTransaction = async (data) => {
  return prisma.transaction.create({
    data,
  });
};

export const getTransactions = async (
  orgId,
  skip,
  take
) => {
  return prisma.transaction.findMany({
    where: {
      orgId,
    },
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
};