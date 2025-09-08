import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getUserByUsername,
  userLogout,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// auth routes

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", userLogout);
router.get("/me", protect, getUser);

// public profile

router.get("/u/:username", getUserByUsername);

export default router;
