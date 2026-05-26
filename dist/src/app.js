"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const db_health_check_middleware_1 = __importDefault(require("./middlewares/db_health_check_middleware"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use(db_health_check_middleware_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/workouts", workoutRoutes_1.default);
app.use("/api/upload", uploadRoutes_1.default);
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Error Middleware
app.use(errorMiddleware_1.default);
exports.default = app;
