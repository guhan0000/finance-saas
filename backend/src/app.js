import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import transactionRoutes from "./routes/transaction/transaction.routes.js";
import dashboardRoutes from "./routes/dashboard/dashboard.routes.js";
import exportRoutes from "./routes/export.routes.js";
import categoryRoutes from "./routes/category/category.routes.js";
import userRoutes from "./routes/user/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Finance SaaS API Running");
});

export default app;
