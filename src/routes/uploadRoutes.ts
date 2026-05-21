import express from "express";

import authMiddleware
  from "../middlewares/authMiddleware";

import upload
  from "../middlewares/uploadMiddleware";

import {
  uploadImage
} from "../controllers/uploadController";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  uploadImage
);

export default router;