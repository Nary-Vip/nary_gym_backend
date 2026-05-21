import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";
import asyncHandler from "../utils/asyncHandler";

const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_SECRET as string,
    { expiresIn: "30d" }
  );
};

export const createAccount = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const {
    name,
    email,
    phone,
    password
  } = req.body;

  const existingUser =
    await User.findOne({ email });

  if (existingUser) {

    return res.status(400).json({
      message: "Email already exists"
    });
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    }
  });
});

export const login = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const {
    email,
    password
  } = req.body;

  const user =
    await User.findOne({ email });

  if (!user) {

    return res.status(400).json({
      message: "Invalid credentials"
    });
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials"
    });
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    }
  });
});