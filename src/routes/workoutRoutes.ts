import express from "express";

import authMiddleware from "../middlewares/authMiddleware";

import {
  getAllWorkouts
} from "../controllers/workoutController";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAllWorkouts
);

export default router;