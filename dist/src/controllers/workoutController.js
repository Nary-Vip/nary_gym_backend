"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = exports.updateWorkout = exports.createWorkout = exports.getAllWorkouts = void 0;
const Workout_1 = __importDefault(require("../models/Workout"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({ folder: "gym-app/workouts" }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result.secure_url);
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
exports.getAllWorkouts = (0, asyncHandler_1.default)(async (req, res) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit) || 10;
    const skip = limit * (page - 1);
    const search = req.query.search;
    const workoutType = req.query.workoutType;
    const query = {};
    if (workoutType) {
        query.workOutType = workoutType;
    }
    if (search) {
        query.workOutName = {
            $regex: search,
            $options: "i"
        };
    }
    const totalWorkouts = await Workout_1.default.countDocuments();
    const workouts = (await Workout_1.default.find(query).limit(limit).skip(skip).lean());
    const totalPages = Math.ceil(totalWorkouts / limit);
    res.json({
        workouts,
        totalPages,
        limit,
        page,
        totalWorkouts
    });
});
exports.createWorkout = (0, asyncHandler_1.default)(async (req, res) => {
    let workOutImage = null;
    if (req.file) {
        workOutImage = await uploadToCloudinary(req.file.buffer);
    }
    const workout = await Workout_1.default.create({
        ...req.body,
        workOutImage
    });
    return res.status(201).json({ message: "Workout created successfully", workout });
});
exports.updateWorkout = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
        updateData.workOutImage = await uploadToCloudinary(req.file.buffer);
    }
    const updatedWorkout = await Workout_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
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
exports.deleteWorkout = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const deletedWorkout = await Workout_1.default.findByIdAndDelete(id);
    if (!deletedWorkout) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }
    res.json({
        message: "Workout deleted"
    });
});
