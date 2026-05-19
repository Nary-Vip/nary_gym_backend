import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";

const generateToken = (
  userId: string
) => {

  return jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d"
    }
  );
};

export const createAccount = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      phone,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {

      return res.status(400).json({
        message: "All fields required"
      });
    }

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

    const token = generateToken(
      user.id
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {

  try {

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

    const token = generateToken(
      user.id
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });
  }
};