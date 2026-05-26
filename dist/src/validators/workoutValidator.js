"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkoutSchema = exports.createWorkoutSchema = void 0;
const zod_1 = require("zod");
const Workout_1 = require("../models/Workout");
exports.createWorkoutSchema = zod_1.z.object({
    workOutName: zod_1.z
        .string()
        .min(3),
    workOutType: zod_1.z.enum([
        Workout_1.WorkOutType.LEG,
        Workout_1.WorkOutType.CHEST,
        Workout_1.WorkOutType.BACK,
        Workout_1.WorkOutType.SHOULDER
    ]),
});
exports.updateWorkoutSchema = exports.createWorkoutSchema.partial();
