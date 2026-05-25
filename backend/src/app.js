import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Finance SaaS API Running");
});

export default app;
