"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
exports.uploadImage = (0, asyncHandler_1.default)(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No image uploaded"
        });
    }
    const fileBuffer = req.file.buffer;
    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder: "gym-app"
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
        streamifier_1.default
            .createReadStream(fileBuffer)
            .pipe(stream);
    });
    return res.status(200).json({
        imageUrl: result.secure_url
    });
});
