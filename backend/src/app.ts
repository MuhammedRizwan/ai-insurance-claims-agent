import express from "express";
import cors from "cors";
import claimRoutes from "./routes/claim.routes.js";
import env from "./config/env.js";

const app = express();

app.use(cors({
  origin:env.API_BASE_URL,
  credentials: true,
}));
app.use(express.json());

// API routes
app.use("/api", claimRoutes);

export default app;
