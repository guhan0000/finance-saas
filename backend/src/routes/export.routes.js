import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import { exportTransactions } from "../controllers/export/export.controller.js";

const router = express.Router();

router.get("/transactions", authenticate, exportTransactions);

export default router;
