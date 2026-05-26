import mongoose from "mongoose";
import Workout, { WorkOutType } from "../models/Workout";
import dotenv from "dotenv";

dotenv.config();

const workouts = [
  // Day 1 - SHOULDER
  {
    workOutName: "Machine Shoulder Press",
    workOutType: WorkOutType.SHOULDER,
    workOutImage: "machine_shoulder_press"
  },
  {
    workOutName: "Lateral Raise",
    workOutType: WorkOutType.SHOULDER,
    workOutImage: "lateral_raise"
  },
  {
    workOutName: "Front Raise",
    workOutType: WorkOutType.SHOULDER,
    workOutImage: "front_raise"
  },
  {
    workOutName: "Machine Rear Delt Fly",
    workOutType: WorkOutType.SHOULDER,
    workOutImage: "machine_rear_delt_fly"
  },

  // Day 2 - LEG
  {
    workOutName: "Leg Extension",
    workOutType: WorkOutType.LEG,
    workOutImage: "leg_extension"
  },
  {
    workOutName: "Leg Press",
    workOutType: WorkOutType.LEG,
    workOutImage: "leg_press"
  },
  {
    workOutName: "Lying Curls",
    workOutType: WorkOutType.LEG,
    workOutImage: "lying_curls"
  },
  {
    workOutName: "Squats",
    workOutType: WorkOutType.LEG,
    workOutImage: "squats"
  },

  // Day 3 - CHEST
  {
    workOutName: "Machine Incline Chest Press",
    workOutType: WorkOutType.CHEST,
    workOutImage: "machine_incline_chest_press"
  },
  {
    workOutName: "Machine Pec Fly",
    workOutType: WorkOutType.CHEST,
    workOutImage: "machine_pec_fly"
  },
  {
    workOutName: "Machine Flat Press",
    workOutType: WorkOutType.CHEST,
    workOutImage: "machine_flat_press"
  },
  {
    workOutName: "Push Down",
    workOutType: WorkOutType.CHEST,
    workOutImage: "push_down"
  },
  {
    workOutName: "Seated Dips",
    workOutType: WorkOutType.CHEST,
    workOutImage: "seated_dips"
  },

  // Day 4 - BACK
  {
    workOutName: "Lat Pulldown",
    workOutType: WorkOutType.BACK,
    workOutImage: "lat_pulldown"
  },
  {
    workOutName: "Seated Rowing",
    workOutType: WorkOutType.BACK,
    workOutImage: "seated_rowing"
  },
  {
    workOutName: "One Arm Rowing",
    workOutType: WorkOutType.BACK,
    workOutImage: "one_arm_rowing"
  },
  {
    workOutName: "Dumbbell Curls",
    workOutType: WorkOutType.BACK,
    workOutImage: "dumbbell_curls"
  },
  {
    workOutName: "Preacher Curls",
    workOutType: WorkOutType.BACK,
    workOutImage: "preacher_curls"
  }
];

const seedWorkouts = async () => {
  try {
    await mongoose.connect(
        
        "mongodb+srv://rmnareshkumar001_db_user:Nary001@narygymcluster.gsi9t4b.mongodb.net/?appName=NaryGymCluster"
    );

    console.log("MongoDB connected");

    await Workout.deleteMany();

    await Workout.insertMany(workouts);

    console.log("Workout data inserted");

    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedWorkouts();