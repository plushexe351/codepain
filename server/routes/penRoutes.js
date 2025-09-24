import express from "express";
import { protect } from "../middlewares/authHandler.js";
import {
  createPen,
  getPen,
  updatePrivacy,
  getPensByUser,
} from "../controllers/penController.js";

const penRoutes = express.Router();

penRoutes.post("/", protect, createPen);
penRoutes.get("/me", protect, getPen);
penRoutes.patch("/:penID/privacy", protect, updatePrivacy);
penRoutes.get("/user/:userID", getPensByUser);

export { penRoutes };
