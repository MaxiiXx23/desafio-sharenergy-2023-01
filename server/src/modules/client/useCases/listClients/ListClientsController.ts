import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/errors/ApiError";
import { ListClientsUseCase } from "./ListClientsUseCase";

class ListClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listClientUseCase = container.resolve(ListClientsUseCase);
    try {
      const all = await listClientUseCase.execute(id);
      return response.json({ listClient: all });
    } catch (error) {
      const { message, statusCode } = error as ApiError;
      return response.status(statusCode).json({ error: message });
    }
  }
}

export { ListClientsController };
