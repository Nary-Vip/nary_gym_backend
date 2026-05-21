import {
  Request,
  Response,
  NextFunction
} from "express";

import {
  ZodError, z
} from "zod";

const validate = (
  schema: z.ZodType
) => {

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      req.body =
        await schema.parseAsync(
          req.body
        );

      next();

    } catch (error) {

      if (error instanceof ZodError) {

        return res.status(400).json({
          errors: error.issues
        });
      }

      return res.status(500).json({
        message: "Validation error"
      });
    }
  };
};

export default validate;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const logoutSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const updateAccountSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided"
});