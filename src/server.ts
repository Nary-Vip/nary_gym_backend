
import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

connectDB();

const PORT = process.env.PORT || 3888;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});