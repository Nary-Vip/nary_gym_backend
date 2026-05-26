"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDatabaseConnected = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.isDatabaseConnected = false;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        exports.isDatabaseConnected = true;
        console.log("MongoDB connected");
    }
    catch (error) {
        exports.isDatabaseConnected = false;
        console.error("MongoDB connection failed", error);
    }
};
exports.default = connectDB;
