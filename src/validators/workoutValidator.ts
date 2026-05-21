import { z } from "zod";
import { WorkOutType } from "../models/Workout";

export const createWorkoutSchema = z.object({

  workOutName: z
    .string()
    .min(3),

  workOutType: z.enum([
    WorkOutType.LEG,
    WorkOutType.CHEST,
    WorkOutType.BACK,
    WorkOutType.SHOULDER
  ]),

  workOutImage: z
    .string()
    .min(1)
});

export const updateWorkoutSchema =
  createWorkoutSchema.partial();