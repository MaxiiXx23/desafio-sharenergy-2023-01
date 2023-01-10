import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/errors/ApiError";
import { SelectClientUseCase } from "./SelectClientUseCase";

class SelectClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { idClient } = request.params;

    const selectClientUseCase = container.resolve(SelectClientUseCase);

    try {
      const client = await selectClientUseCase.execute({ id, idClient });

      return response.json({ client });
    } catch (error) {
      const { message, statusCode } = error as ApiError;
      return response.status(statusCode).json({ error: message });
    }
  }
}

export { SelectClientController };
