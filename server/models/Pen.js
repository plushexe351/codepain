import mongoose from "mongoose";

const penSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    html: { type: String, default: "" },
    css: { type: String, default: "" },
    js: { type: String, default: "" },
  },
  { timestamps: true }
);

const Pen = mongoose.model("Pen", penSchema);
export default Pen;
