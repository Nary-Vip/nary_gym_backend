import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    workOutName: {
      type: String,
      required: true
    },

    workOutType: {
      type: String,
      enum: [
        "LEG",
        "CHEST",
        "BACK",
        "SHOULDER"
      ],
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