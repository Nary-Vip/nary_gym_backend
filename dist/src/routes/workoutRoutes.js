"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const workoutController_1 = require("../controllers/workoutController");
const workoutValidator_1 = require("../validators/workoutValidator");
const validator_1 = __importDefault(require("../middlewares/validator"));
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Workout management routes
 */
/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts with pagination, search and filter
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by workout name
 *       - in: query
 *         name: workoutType
 *         schema:
 *           type: string
 *           enum: [LEG, CHEST, BACK, SHOULDER]
 *         description: Filter by workout type
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workouts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       workOutName:
 *                         type: string
 *                       workOutType:
 *                         type: string
 *                       workOutImage:
 *                         type: string
 *                 totalPages:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalWorkouts:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware_1.default, workoutController_1.getAllWorkouts);
/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [workOutName, workOutType, image]
 *             properties:
 *               workOutName:
 *                 type: string
 *                 example: Squats
 *               workOutType:
 *                 type: string
 *                 enum: [LEG, CHEST, BACK, SHOULDER]
 *                 example: LEG
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Workout image (JPEG, PNG, WebP — max 5MB)
 *     responses:
 *       201:
 *         description: Workout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 workout:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     workOutName:
 *                       type: string
 *                     workOutType:
 *                       type: string
 *                     workOutImage:
 *                       type: string
 *       400:
 *         description: Workout image is required
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware_1.default, uploadMiddleware_1.default.single("image"), (0, validator_1.default)(workoutValidator_1.createWorkoutSchema), workoutController_1.createWorkout);
/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Update a workout
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               workOutName:
 *                 type: string
 *                 example: Deadlift
 *               workOutType:
 *                 type: string
 *                 enum: [LEG, CHEST, BACK, SHOULDER]
 *                 example: BACK
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional new workout image (JPEG, PNG, WebP — max 5MB)
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 workout:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     workOutName:
 *                       type: string
 *                     workOutType:
 *                       type: string
 *                     workOutImage:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
router.put("/:id", authMiddleware_1.default, uploadMiddleware_1.default.single("image"), (0, validator_1.default)(workoutValidator_1.updateWorkoutSchema), workoutController_1.updateWorkout);
/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Delete a workout
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
router.delete("/:id", authMiddleware_1.default, workoutController_1.deleteWorkout);
exports.default = router;
