import express from "express";

import authMiddleware from "../middlewares/authMiddleware";

import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  updateWorkout
} from "../controllers/workoutController";
import { createWorkoutSchema, updateWorkoutSchema } from "../validators/workoutValidator";
import validate from "../middlewares/validator";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAllWorkouts
);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  validate(createWorkoutSchema),
  createWorkout
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  validate(updateWorkoutSchema),
  updateWorkout
);


router.delete(
  "/:id",
  authMiddleware,
  deleteWorkout
);



export default router;