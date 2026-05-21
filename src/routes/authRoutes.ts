import express from "express";
import { createAccount, login, logout, refreshToken, updateAccount } from "../controllers/authController";
import validate, { logoutSchema, refreshTokenSchema, updateAccountSchema } from "../middlewares/validator";
import { createAccountSchema, loginSchema } from "../validators/authValidator";
import upload from "../middlewares/uploadMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create-account", upload.single("image"), validate(createAccountSchema),createAccount);

router.post("/login", validate(loginSchema), login);

router.post("/logout", validate(logoutSchema), logout);

router.post("/refresh-session", validate(refreshTokenSchema), refreshToken);

router.patch(
  "/update-account",
  authMiddleware,
  upload.single("image"),
  validate(updateAccountSchema),
  updateAccount
);

export default router;