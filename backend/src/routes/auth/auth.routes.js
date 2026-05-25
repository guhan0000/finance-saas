import express from "express";

import { register } from "../../controllers/auth/auth.controller.js";
import { login } from "../../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
