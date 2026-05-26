"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const uploadController_1 = require("../controllers/uploadController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.default, uploadMiddleware_1.default.single("image"), uploadController_1.uploadImage);
exports.default = router;
