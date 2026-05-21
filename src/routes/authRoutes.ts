import express from "express";
import { createAccount, login } from "../controllers/authController";
import validate from "../middlewares/validator";
import { createAccountSchema, loginSchema } from "../validators/authValidator";

const router = express.Router();

router.post("/create-account", validate(createAccountSchema),createAccount);

router.post("/login", validate(loginSchema), login);

export default router;