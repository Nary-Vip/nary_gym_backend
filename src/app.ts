import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import workoutRoutes from "./routes/workoutRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);

export default app;