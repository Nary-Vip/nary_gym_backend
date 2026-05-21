import mongoose from "mongoose";

export enum WorkOutType {
  LEG = "LEG",
  CHEST = "CHEST",
  BACK = "BACK",
  SHOULDER = "SHOULDER"
}

export interface IWorkout {
  workOutName: string;
  workOutType: WorkOutType;
  workOutImage: string;
}

const workoutSchema = new mongoose.Schema(
  {
    workOutName: {
      type: String,
      required: true
    },

    workOutType: {
      type: String,
      enum: Object.values(WorkOutType),
      required: true
    },

    workOutImage: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Workout = mongoose.model(
  "Workout",
  workoutSchema
);

export default Workout;