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
          errors: error.message
        });
      }

      return res.status(500).json({
        message: "Validation error"
      });
    }
  };
};

export default validate;