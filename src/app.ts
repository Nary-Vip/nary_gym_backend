import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";
import uploadRoutes from "./routes/uploadRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import databaseMiddleware from "./middlewares/db_health_check_middleware";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(databaseMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Middleware
app.use(errorMiddleware);

export default app;