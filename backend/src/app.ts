import express from "express";
import cors from "cors";
import claimRoutes from "./routes/claim.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", claimRoutes);

export default app;
