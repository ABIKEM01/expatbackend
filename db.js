import mongoose from "mongoose";

export const connectDB = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};

