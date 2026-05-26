"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.updateAccount = exports.logout = exports.refreshToken = exports.login = exports.createAccount = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const streamifier_1 = __importDefault(require("streamifier"));
const User_1 = __importDefault(require("../models/User"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1m" });
};
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: "30d" });
};
exports.createAccount = (0, asyncHandler_1.default)(async (req, res) => {
    const { name, email, phone, password } = req.body;
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    let profileImage = null;
    if (req.file) {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary_1.default.uploader.upload_stream({ folder: "gym-app/profiles" }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
            streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
        });
        profileImage = result.secure_url;
    }
    const user = await User_1.default.create({
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
        "token": {
            accessToken,
            refreshToken,
        },
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profileImage: profileImage
        }
    });
});
exports.login = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
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
        "token": {
            accessToken,
            refreshToken,
        },
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profileImage: user.profile
        }
    });
});
exports.refreshToken = (0, asyncHandler_1.default)(async (req, res) => {
    const { refreshToken } = req.body;
    // Verify signature first
    const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET);
    // Then check it matches what's stored in DB
    const user = await User_1.default.findById(decoded.userId);
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
exports.logout = (0, asyncHandler_1.default)(async (req, res) => {
    const { refreshToken } = req.body;
    await User_1.default.findOneAndUpdate({ refreshToken }, { refreshToken: null });
    console.log("Logged off");
    return res.status(200).json({ message: "Logged out successfully" });
});
exports.updateAccount = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.userId;
    const { name, phone } = req.body;
    if (!name &&
        !phone &&
        !req.file) {
        return res.status(400).json({
            message: "At least one field must be provided"
        });
    }
    if (!name && !phone && !req.file) {
        return res.status(400).json({ message: "At least one field must be provided" });
    }
    const user = await User_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (name)
        user.name = name;
    if (phone)
        user.phone = phone;
    if (req.file) {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary_1.default.uploader.upload_stream({ folder: "gym-app/profiles" }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
            streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
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
exports.getUser = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.userId;
    const user = await User_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    return res.status(200).json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profileImage: user.profile
        }
    });
});
