import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

//user registration

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(401).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email, password: hashedPassword });
  generateToken(res, user._id);
  res.status(200).json({ user: { id: user._id, username, email }, token });
});

// user login

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //checkin if user is there
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Cannot find account" });

  //passwcheck

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

  generateToken(res, user._id);

  res.status(200).json({
    user: { id: user._id, username: user.username, email: user.email },
    token,
  });
});

//getting user

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// get user by username
const getUserByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select(
    "-password"
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// get user by id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export default {
  getUser,
  loginUser,
  registerUser,
  getUserById,
  getUserByUsername,
};
