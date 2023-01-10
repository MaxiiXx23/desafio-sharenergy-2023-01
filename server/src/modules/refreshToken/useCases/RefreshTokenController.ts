import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../shared/errors/ApiError";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    try {
      const result = await refreshTokenUseCase.execute({ refreshToken });

      return response.json(result);
    } catch (error) {
      const { message, statusCode } = error as ApiError;
      return response.status(statusCode).json({ error: message });
    }
  }
}

export { RefreshTokenController };
