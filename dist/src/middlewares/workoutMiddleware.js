"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("./authMiddleware"));
const workoutController_1 = require("../controllers/workoutController");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.default, workoutController_1.getAllWorkouts);
router.post("/", authMiddleware_1.default, workoutController_1.createWorkout);
router.put("/:id", authMiddleware_1.default, workoutController_1.updateWorkout);
router.delete("/:id", authMiddleware_1.default, workoutController_1.deleteWorkout);
exports.default = router;
