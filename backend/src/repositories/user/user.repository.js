import prisma from "../../config/prisma.js";

export const createOrgUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

export const getOrgUsers = async (orgId) => {
  return prisma.user.findMany({
    where: {
      orgId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
