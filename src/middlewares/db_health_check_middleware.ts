import { Request, Response, NextFunction } from "express";

import { isDatabaseConnected } from "../config/db";

const databaseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!isDatabaseConnected) {

    return res.status(503).json({
      message: "Database unavailable"
    });
  }

  next();
};

export default databaseMiddleware;