import mongoose from "mongoose";
import { MONGODB_URL } from "./constants";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
