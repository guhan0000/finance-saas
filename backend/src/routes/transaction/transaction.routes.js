import express from "express";

import {
  create,
  getAll,
  update,
  remove,
} from "../../controllers/transaction/transaction.controller.js";

import { authenticate } from "../../middlewares/auth.middleware.js";

import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

/*
USER:
- create transactions
- manage own transactions
*/

router.post("/", authenticate, authorizeRoles("USER"), create);

router.get("/", authenticate, authorizeRoles("USER", "ACCOUNTANT"), getAll);

router.put("/:id", authenticate, authorizeRoles("USER"), update);

router.delete("/:id", authenticate, authorizeRoles("USER"), remove);

export default router;
