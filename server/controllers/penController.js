import { Pen } from "../models/Pen";
import { asyncHandler } from "../middlewares/asyncHandler";
import { User } from "../models/User";

export const createPen = asyncHandler(async (req, res) => {
  const { name, html, css, js } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  const pen = Pen.create({ user: req.user.id, name, html, css, js });

  return res.status(200).json({ success: true, data: pen });
});

export const getPen = asyncHandler(async (req, res) => {
  if (!req.user)
    return res.status(400).json({ message: "something went wrong" });

  const pens = await Pen.find({ user: req.user.id });
  return res.status(200).json({ success: true, data: pens });
});

export const updatePrivacy = asyncHandler(async (req, res) => {
  const { penID } = req.params;
  const pen = await Pen.findById(penID);

  if (!pen) return res.status(404).json({ message: "pen not found" });

  if (!req.user.pens.map(String).includes(pen._id))
    return res.status(403).json({ message: "not authorized" });

  pen.private = !pen.private;
  await pen.save();
  return res.status(200).json({ success: true, data: pen });
});

export const getPensByUser = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const userExists = await User.findById(userID);
  if (!userExists)
    return res.status(404).json({ message: "user does not exist" });
  const pens = await Pen.find({ user: userID, private: false }).populate(
    "user",
    "username"
  );

  return res.status(200).json({ success: true, data: pens });
});
