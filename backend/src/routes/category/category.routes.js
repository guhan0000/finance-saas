import express from "express";

import { authenticate } from "../../middlewares/auth.middleware.js";

import { getAllCategories } from "../../controllers/category/category.controller.js";
import {
  create,
  remove,
} from "../../controllers/category/category.controller.js";

import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", authenticate, getAllCategories);
router.post("/", authenticate, authorizeRoles("ADMIN"), create);

router.delete("/:id", authenticate, authorizeRoles("ADMIN"), remove);

export default router;
