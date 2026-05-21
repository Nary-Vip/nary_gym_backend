import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler";

import cloudinary from "../config/cloudinary";

import streamifier from "streamifier";

export const uploadImage =
  asyncHandler(async (
    req: Request,
    res: Response
  ) => {

    if (!req.file) {

      return res.status(400).json({
        message: "No image uploaded"
      });
    }

    const fileBuffer = req.file.buffer;

    const result =
      await new Promise<any>(
        (resolve, reject) => {

        const stream =
          cloudinary.uploader.upload_stream(
            {
              folder: "gym-app"
            },

            (error, result) => {

              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

        streamifier
          .createReadStream(fileBuffer)
          .pipe(stream);
    });

    return res.status(200).json({

      imageUrl:
        result.secure_url
    });
});
