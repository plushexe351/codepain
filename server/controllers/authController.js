import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { validateEmail } from "../utils/validateEmail.js";

//-------------------------------------------------------------------------------------------------------------

//user registration
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //email validation
  const emailLowered = email.toLowerCase();
  if (!validateEmail(emailLowered))
    return res.status(400).json({ message: "Invalid email format" });

  //checking for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  const token = generateToken(res, user._id);
  res.status(200).json({ user: { id: user._id, username, email }, token });
});
//----------------------------------------------------------------------------------------------------------

// user login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //checkin if user is there
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Cannot find account" });

  //passwcheck

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

  const token = generateToken(res, user._id);

  res.status(200).json({
    user: { id: user._id, username: user.username, email: user.email },
    token,
  });
});
//----------------------------------------------------------------------------------------------------------------

//getting user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});
//----------------------------------------------------------------------------------------------------------------

// get user by username
const getUserByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select(
    "-password"
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});
//-------------------------------------------------------------------------------------------------------------------

// logout
const userLogout = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
    expires: new Date(0),
  });
  res.status(200).json({ message: "User has been logged out" });
});
//------------------------------------------------------------------------------------------------------------------------

export { getUser, loginUser, registerUser, getUserByUsername, userLogout };
