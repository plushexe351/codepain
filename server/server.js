import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes.js";
import helmet, { contentSecurityPolicy } from "helmet";

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(helmet()); // for prod

// app.use(
//   helmet({ contentSecurityPolicy: process.env.NODE_ENV === "production" })
// ); // for dev

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://127.0.0.1:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(ExpressMongoSanitize());

// routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
