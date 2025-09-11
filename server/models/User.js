import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pen" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export { User };
