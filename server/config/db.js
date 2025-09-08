import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connected");
  } catch (err) {
    console.log("failed to connect");
    process.exit(1);
  }
};

export default connectDB;
