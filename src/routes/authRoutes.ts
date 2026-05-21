import express from "express";
import { createAccount, login, logout, refreshToken } from "../controllers/authController";
import validate, { logoutSchema, refreshTokenSchema } from "../middlewares/validator";
import { createAccountSchema, loginSchema } from "../validators/authValidator";

const router = express.Router();

router.post("/create-account", validate(createAccountSchema),createAccount);

router.post("/login", validate(loginSchema), login);

router.post("/logout", validate(logoutSchema), logout);

router.post("/refresh-session", validate(refreshTokenSchema), refreshToken);

export default router;