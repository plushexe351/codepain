import jwt from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler.js";
import { User } from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export { protect };
