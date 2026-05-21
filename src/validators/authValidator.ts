import { z } from "zod";

export const createAccountSchema =
  z.object({

    name: z
      .string()
      .min(3),

    email: z
      .string()
      .email(),

    phone: z
      .string()
      .min(10),

    password: z
      .string()
      .min(6)
});

export const loginSchema =
  z.object({

    email: z
      .string()
      .email(),

    password: z
      .string()
      .min(6)
});