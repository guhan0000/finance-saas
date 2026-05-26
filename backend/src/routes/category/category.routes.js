import express from "express";

import { authenticate } from "../../middlewares/auth.middleware.js";

import { getAllCategories } from "../../controllers/category/category.controller.js";

const router = express.Router();

router.get("/", authenticate, getAllCategories);

export default router;
