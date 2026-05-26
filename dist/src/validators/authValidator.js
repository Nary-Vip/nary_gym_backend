"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createAccountSchema = void 0;
const zod_1 = require("zod");
exports.createAccountSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3),
    email: zod_1.z
        .string()
        .email(),
    phone: zod_1.z
        .string()
        .min(10),
    password: zod_1.z
        .string()
        .min(6)
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email(),
    password: zod_1.z
        .string()
        .min(6)
});
