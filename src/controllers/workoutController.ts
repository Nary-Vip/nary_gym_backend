import { Request, Response } from "express";

import Workout from "../models/Workout";

export const getAllWorkouts = async (
  req: Request,
  res: Response
) => {

  try {

    const workouts =
      await Workout.find();

    res.json(workouts);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });
  }
};