import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../shared/errors/ApiError";
import { AuthenticateUseCase } from "./AuthenticateUseCase";

class AuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUseCase = container.resolve(AuthenticateUseCase);

    try {
      const token = await authenticateUseCase.execute({ username, password });
      return response.json(token);
    } catch (error) {
      const { message, statusCode } = error as ApiError;
      return response.status(statusCode).json({ error: message });
    }
  }
}

export { AuthenticateController };
