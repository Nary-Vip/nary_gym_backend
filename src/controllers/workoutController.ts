import { Request, Response } from "express";

import Workout from "../models/Workout";
import { AuthRequest } from "../middlewares/authMiddleware";
import asyncHandler from "../utils/asyncHandler";

export const getAllWorkouts = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const page = Number(req.query.page ?? 0)

  const limit = Number(req.query.limit) || 10
  const skip = limit * (page - 1)

  const search = req.query.search
  const workoutType = req.query.workoutType

  const query: any = {}

  if (workoutType) {
    query.workOutType = workoutType
  }
  if (search) {
    query.workOutName = {
      $regex: search,
      $options: "i"
    }
  }

  const totalWorkouts = await Workout.countDocuments();

  const workouts =
    (await Workout.find(query).limit(10).skip(skip).lean());

  const totalPages = Math.ceil(totalWorkouts / limit);

  res.json({
    workouts,
    totalPages,
    limit,
    page,
    totalWorkouts
  });
});

export const createWorkout = asyncHandler(async (
  req: Request, res: Response) => {


  const workout = await Workout.create(req.body)

  return res.status(200).json({ message: "Workout created successfully", workout })
});

export const updateWorkout = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;


  const updatedWorkout =
    await Workout.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

  if (!updatedWorkout) {

    return res.status(404).json({
      message: "Workout not found"
    });
  }

  return res.status(200).json({
    message: "Workout updated successfully",
    workout: updatedWorkout
  });
});

export const deleteWorkout = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  const deletedWorkout =
    await Workout.findByIdAndDelete(id);

  if (!deletedWorkout) {
    return res.status(404).json({
      message: "Workout not found"
    });
  }

  res.json({
    message: "Workout deleted"
  });
});