import express from "express";

import {
  create,
  getAll,
} from "../../controllers/transaction/transaction.controller.js";
import {
  update,
  remove,
} from "../../controllers/transaction/transaction.controller.js";

import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, create);

router.get("/", authenticate, getAll);
router.put("/:id", authenticate, update);

router.delete("/:id", authenticate, remove);

export default router;
