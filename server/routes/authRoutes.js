import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getUserByUsername,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// auth routes

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

// public profile

router.get("/u/:username", getUserByUsername);

export default router;
