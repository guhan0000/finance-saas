import bcrypt from "bcryptjs";

import {
  createOrgUser,
  getOrgUsers,
} from "../../repositories/user/user.repository.js";

import { findUserByEmail } from "../../repositories/auth/auth.repository.js";

export const createUserByAdmin = async (data, admin) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  if (data.role === "ADMIN") {
    throw new Error("Cannot create admin");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return createOrgUser({
    name: data.name,

    email: data.email,

    password: hashedPassword,

    role: data.role,

    orgId: admin.orgId,
  });
};

export const fetchUsers = async (user) => {
  return getOrgUsers(user.orgId);
};
