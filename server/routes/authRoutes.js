import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  getUserByUsername,
  getUserById,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// auth routes

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);

// public profile

router.get("/u/:username", getUserByUsername);
router.get("/id/:id", getUserById);

export default router;
