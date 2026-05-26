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

export const createCategory = async (data) => {
  return prisma.category.create({
    data,
  });
};

export const deleteCategory = async (id, orgId) => {
  return prisma.category.deleteMany({
    where: {
      id,
      orgId,
    },
  });
};
