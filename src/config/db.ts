import mongoose from "mongoose";

export let isDatabaseConnected = false;

const connectDB = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI as string
    );

    isDatabaseConnected = true;

    console.log("MongoDB connected");

  } catch (error) {

    isDatabaseConnected = false;

    console.error(
      "MongoDB connection failed",
      error
    );
  }
};

export default connectDB;