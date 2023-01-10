import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/errors/ApiError";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { idClient } = request.params;

    const deleteClientUseCase = container.resolve(DeleteClientUseCase);

    try {
      await deleteClientUseCase.execute({ id, idClient });
      return response.json({ msg: "Client deleted." });
    } catch (error) {
      const { message, statusCode } = error as ApiError;
      return response.status(statusCode).json({ error: message });
    }
  }
}

export { DeleteClientController };
