import express from "express";

import {
  authenticate,
} from "../../middlewares/auth.middleware.js";

import {
  authorizeRoles,
} from "../../middlewares/role.middleware.js";

import {
  createUser,
  getUsers,
} from "../../controllers/user/user.controller.js";

const router =
  express.Router();

router.use(
  authenticate,
  authorizeRoles("ADMIN")
);

router.post(
  "/",
  createUser
);

router.get(
  "/",
  getUsers
);

export default router;