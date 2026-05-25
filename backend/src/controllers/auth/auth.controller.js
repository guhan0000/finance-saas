import { registerSchema } from "../../validations/auth/auth.validation.js";

import { registerUser } from "../../services/auth/auth.service.js";

import { loginSchema } from "../../validations/auth/auth.validation.js";
import { loginUser } from "../../services/auth/auth.service.js";
import { refreshUserToken } from "../../services/auth/auth.service.js";
export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const result = await registerUser(validatedData);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    const result = await refreshUserToken(token);

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
