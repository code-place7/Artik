import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    const connecting = await mongoose.connect(process.env.MOGO_URI);
    console.log(
      "MongoDB connected  successfully ✅",
      connecting.connection.host
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
