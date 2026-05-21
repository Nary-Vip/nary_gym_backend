import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import AppError from "../utils/AppError";
import multer from "multer";

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }
  
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "Image size must be under 5MB" });
    }
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      message: "Refresh token expired"
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      message: "Invalid refresh token"
    });
  }

  return res.status(500).json({
    message: "Internal Server Error"
  });
};

export default errorMiddleware;