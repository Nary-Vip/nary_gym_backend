import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";
import uploadRoutes from "./routes/uploadRoutes";

const app = express();

app.use(cors());
app.use(express.json());
// Error Middleware
app.use(errorMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/upload", uploadRoutes);

export default app;