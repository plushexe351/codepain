import mongoose from "mongoose";
import { User } from "./User.js";

const penSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    name: { type: String, required: true },
    html: { type: String, default: "" },
    css: { type: String, default: "" },
    js: { type: String, default: "" },
    private: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Pen = mongoose.model("Pen", penSchema);
export { Pen };
