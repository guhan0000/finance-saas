import prisma from "../../config/prisma.js";

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createOrganization = async (name) => {
  return prisma.organization.create({
    data: { name },
  });
};

export const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

export const saveRefreshToken = async (data) => {
  return prisma.refreshToken.create({
    data,
  });
};

export const findRefreshToken = async (token) => {
  return prisma.refreshToken.findUnique({
    where: { token },
  });
};

export const deleteRefreshToken = async (token) => {
  return prisma.refreshToken.delete({
    where: { token },
  });
};
