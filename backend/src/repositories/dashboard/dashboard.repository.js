import prisma from "../../config/prisma.js";

export const getDashboardSummary = async (orgId, userId, role) => {
  const income = await prisma.transaction.aggregate({
    where: {
      ...(role === "USER"
        ? {
            userId,
          }
        : {
            orgId,
          }),

      type: "INCOME",
    },

    _sum: {
      amount: true,
    },
  });

  const expense = await prisma.transaction.aggregate({
    where: {
      ...(role === "USER"
        ? {
            userId,
          }
        : {
            orgId,
          }),

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

export const getCategoryBreakdown = async (orgId, userId, role) => {
  const grouped = await prisma.transaction.groupBy({
    by: ["categoryId"],

    where: {
      ...(role === "USER"
        ? {
            userId,
          }
        : {
            orgId,
          }),
    },

    _sum: {
      amount: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      orgId,
    },
  });

  return grouped.map((item) => ({
    ...item,

    category: categories.find((cat) => cat.id === item.categoryId),
  }));
};
