import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

import { exportTransactions } from "../controllers/export/export.controller.js";

const router = express.Router();

router.get(
  "/transactions",
  authenticate,
  authorizeRoles("ACCOUNTANT"),
  exportTransactions,
);

export default router;
