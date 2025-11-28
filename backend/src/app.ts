// src/app.ts
import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoRoutes from "./routes/mongo.routes";

// Load env vars early
dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/v1" , mongoRoutes);


export default app;
