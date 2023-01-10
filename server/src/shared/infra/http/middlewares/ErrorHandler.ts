import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import { ApiError } from "../../../errors/ApiError";

const ErrorHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
  error: ErrorRequestHandler & Partial<ApiError>
) => {
  const statusCode = error.statusCode ?? 500;
  return response.status(statusCode).json({ error: error.message });
};

export { ErrorHandler };
