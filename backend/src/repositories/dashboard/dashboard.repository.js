import prisma from "../../config/prisma.js";

export const getDashboardSummary = async (orgId) => {
  const income = await prisma.transaction.aggregate({
    where: {
      orgId,
      type: "INCOME",
    },

    _sum: {
      amount: true,
    },
  });

  const expense = await prisma.transaction.aggregate({
    where: {
      orgId,
      type: "EXPENSE",
    },

    _sum: {
      amount: true,
    },
  });

  return {
    totalIncome: income._sum.amount || 0,

    totalExpense: expense._sum.amount || 0,
  };
};

export const getCategoryBreakdown = async (orgId) => {
  return prisma.transaction.groupBy({
    by: ["categoryId"],

    where: {
      orgId,
    },

    _sum: {
      amount: true,
    },
  });
};
