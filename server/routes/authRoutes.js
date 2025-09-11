import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getUserByUsername,
  userLogout,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const authRoutes = express.Router();

// @permission_classes([AllowAny])

authRoutes.get("/me", protect, getUser);
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", userLogout);

// @permission_classes([IsAuthenticated])

router.get("/u/:username", getUserByUsername);

export { authRoutes };
