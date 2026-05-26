"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("../utils/AppError"));
const multer_1 = __importDefault(require("multer"));
const errorMiddleware = (err, _req, res, _next) => {
    console.log(err);
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    if (err instanceof multer_1.default.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "Image size must be under 5MB" });
        }
        return res.status(400).json({ message: err.message });
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        return res.status(401).json({
            message: "Refresh token expired"
        });
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }
    return res.status(500).json({
        message: "Internal Server Error"
    });
};
exports.default = errorMiddleware;
