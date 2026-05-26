"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Workout_1 = __importStar(require("../models/Workout"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const workouts = [
    // Day 1 - SHOULDER
    {
        workOutName: "Machine Shoulder Press",
        workOutType: Workout_1.WorkOutType.SHOULDER,
        workOutImage: "machine_shoulder_press"
    },
    {
        workOutName: "Lateral Raise",
        workOutType: Workout_1.WorkOutType.SHOULDER,
        workOutImage: "lateral_raise"
    },
    {
        workOutName: "Front Raise",
        workOutType: Workout_1.WorkOutType.SHOULDER,
        workOutImage: "front_raise"
    },
    {
        workOutName: "Machine Rear Delt Fly",
        workOutType: Workout_1.WorkOutType.SHOULDER,
        workOutImage: "machine_rear_delt_fly"
    },
    // Day 2 - LEG
    {
        workOutName: "Leg Extension",
        workOutType: Workout_1.WorkOutType.LEG,
        workOutImage: "leg_extension"
    },
    {
        workOutName: "Leg Press",
        workOutType: Workout_1.WorkOutType.LEG,
        workOutImage: "leg_press"
    },
    {
        workOutName: "Lying Curls",
        workOutType: Workout_1.WorkOutType.LEG,
        workOutImage: "lying_curls"
    },
    {
        workOutName: "Squats",
        workOutType: Workout_1.WorkOutType.LEG,
        workOutImage: "squats"
    },
    // Day 3 - CHEST
    {
        workOutName: "Machine Incline Chest Press",
        workOutType: Workout_1.WorkOutType.CHEST,
        workOutImage: "machine_incline_chest_press"
    },
    {
        workOutName: "Machine Pec Fly",
        workOutType: Workout_1.WorkOutType.CHEST,
        workOutImage: "machine_pec_fly"
    },
    {
        workOutName: "Machine Flat Press",
        workOutType: Workout_1.WorkOutType.CHEST,
        workOutImage: "machine_flat_press"
    },
    {
        workOutName: "Push Down",
        workOutType: Workout_1.WorkOutType.CHEST,
        workOutImage: "push_down"
    },
    {
        workOutName: "Seated Dips",
        workOutType: Workout_1.WorkOutType.CHEST,
        workOutImage: "seated_dips"
    },
    // Day 4 - BACK
    {
        workOutName: "Lat Pulldown",
        workOutType: Workout_1.WorkOutType.BACK,
        workOutImage: "lat_pulldown"
    },
    {
        workOutName: "Seated Rowing",
        workOutType: Workout_1.WorkOutType.BACK,
        workOutImage: "seated_rowing"
    },
    {
        workOutName: "One Arm Rowing",
        workOutType: Workout_1.WorkOutType.BACK,
        workOutImage: "one_arm_rowing"
    },
    {
        workOutName: "Dumbbell Curls",
        workOutType: Workout_1.WorkOutType.BACK,
        workOutImage: "dumbbell_curls"
    },
    {
        workOutName: "Preacher Curls",
        workOutType: Workout_1.WorkOutType.BACK,
        workOutImage: "preacher_curls"
    }
];
const seedWorkouts = async () => {
    try {
        await mongoose_1.default.connect("");
        console.log("MongoDB connected");
        await Workout_1.default.deleteMany();
        await Workout_1.default.insertMany(workouts);
        console.log("Workout data inserted");
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
seedWorkouts();
