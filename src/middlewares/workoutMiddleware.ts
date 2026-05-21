import express from "express";

import authMiddleware from "./authMiddleware";

import {
  getAllWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from "../controllers/workoutController";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAllWorkouts
);

router.post(
  "/",
  authMiddleware,
  createWorkout
);

router.put(
  "/:id",
  authMiddleware,
  updateWorkout
);

router.delete(
  "/:id",
  authMiddleware,
  deleteWorkout
);


export default router;