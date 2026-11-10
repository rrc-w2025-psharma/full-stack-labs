import organizationRoutes from "./routes/organizationRoutes.js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    message: "Pixell River Financial API is running",
  });
});

app.use("/api", employeeRoutes);
app.use("/api", organizationRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
