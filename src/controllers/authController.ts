import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import streamifier from "streamifier";

import User from "../models/User";
import asyncHandler from "../utils/asyncHandler";
import cloudinary from "../config/cloudinary";

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

  let profileImage: string | null = null;
  if (req.file) {
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "gym-app/profiles" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file!.buffer).pipe(stream);
    });
    profileImage = result.secure_url;
  }

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    profile: profileImage,
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
      profile: user.profile
    }
  });
});

export const refreshToken = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const { refreshToken } = req.body;

  // Verify signature first
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET as string
  ) as { userId: string };

  // Then check it matches what's stored in DB
  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshToken) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  // Rotate — issue new both tokens
  const newAccessToken = generateAccessToken(user.id);
  const newRefreshToken = generateRefreshToken(user.id);

  user.refreshToken = newRefreshToken;
  await user.save();

  return res.status(200).json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});

export const logout = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const { refreshToken } = req.body;

  await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: null }
  );

  return res.status(200).json({ message: "Logged out successfully" });
});

export const updateAccount = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const userId = req.userId;
  const { name, phone } = req.body;

  if (!name && !phone && !req.file) {
    return res.status(400).json({ message: "At least one field must be provided" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;

  if (req.file) {
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "gym-app/profiles" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file!.buffer).pipe(stream);
    });
    user.profile = result.secure_url;
  }

  await user.save();

  return res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profileImage: user.profile,
    },
  });
});