import express from "express";

import { authenticate } from "../../middlewares/auth.middleware.js";

import { getDashboard } from "../../controllers/dashboard/dashboard.controller.js";

const router = express.Router();

router.get("/", authenticate, getDashboard);

export default router;
