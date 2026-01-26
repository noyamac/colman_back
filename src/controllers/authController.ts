import { Request, Response } from "express";
import { user } from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId: string): string => {
  const secret: string = process.env.JWT_SECRET || "secretkey";
  const exp: number = parseInt(process.env.JWT_EXPIRES_IN || "3600");
  const token = jwt.sign({ userId }, secret, { expiresIn: exp });

  return token;
};

const register = async (req: Request, res: Response) => {
  const { username, email, password, profilePicture } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email and password are required" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      username,
      email,
      password: encryptedPassword,
      profilePicture,
    });

    const token = generateToken(newUser._id.toString());

    await newUser.save();

    res.status(201).json({ token });
  } catch {
    return res.status(400).json({ error: "Failed to register the user" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const currUser = await user.findOne({ email });
    if (!currUser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const matchPassword = await bcrypt.compare(password, currUser.password);
    if (!matchPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(currUser._id.toString());

    res.status(201).json({ token });
  } catch {
    return res.status(400).json({ error: "Failed to login" });
  }
};

export default {
  register,
  login,
};
