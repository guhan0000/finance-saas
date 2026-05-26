import prisma from "../../config/prisma.js";

export const getCategories = async (orgId) => {
  return prisma.category.findMany({
    where: {
      orgId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
