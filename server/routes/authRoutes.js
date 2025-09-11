import express from "express";
import { protect } from "../middlewares/authHandler.js";
import {
  registerUser,
  loginUser,
  getUser,
  getUserByUsername,
  userLogout,
} from "../controllers/authController.js";

const authRoutes = express.Router();

// @permission_classes([AllowAny])

authRoutes.get("/me", protect, getUser);
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", userLogout);

// @permission_classes([IsAuthenticated])

authRoutes.get("/u/:username", getUserByUsername);

export { authRoutes };
