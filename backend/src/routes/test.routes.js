import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/admin", authenticate, authorizeRoles("ADMIN"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});

export default router;
