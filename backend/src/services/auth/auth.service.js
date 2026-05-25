import bcrypt from "bcryptjs";

import {
  findUserByEmail,
  createOrganization,
  createUser,
  saveRefreshToken,
} from "../../repositories/auth/auth.repository.js";

import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

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
