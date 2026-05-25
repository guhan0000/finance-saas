import prisma from "../../config/prisma.js";
import bcrypt from "bcryptjs";

import {
  findUserByEmail,
  createOrganization,
  createUser,
  saveRefreshToken,
} from "../../repositories/auth/auth.repository.js";

import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

import {
  findRefreshToken,
  deleteRefreshToken,
  deleteAllUserRefreshTokens,
} from "../../repositories/auth/auth.repository.js";

import { verifyRefreshToken } from "../../utils/jwt.js";

export const registerUser = async (data) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const organization = await createOrganization(data.orgName);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    orgId: organization.id,
    role: "ADMIN",
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await saveRefreshToken({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (data) => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await saveRefreshToken({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshUserToken = async (token) => {
  const existingToken = await findRefreshToken(token);

  // Token reuse detection
  if (!existingToken) {
    try {
      const decoded = verifyRefreshToken(token);

      await deleteAllUserRefreshTokens(decoded.userId);

      throw new Error("Token reuse detected");
    } catch {
      throw new Error("Invalid refresh token");
    }
  }

  const decoded = verifyRefreshToken(token);

  await deleteRefreshToken(token);

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  await saveRefreshToken({
    token: newRefreshToken,
    userId: user.id,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};