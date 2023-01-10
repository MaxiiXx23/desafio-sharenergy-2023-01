import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/errors/ApiError";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { idClient } = request.params;
    const { name, email, telefone, cpf } = request.body;

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    try {
      await updateClientUseCase.execute({
        id,
        idClient,
        name,
        email,
        telefone,
        cpf,
      });

      return response.json({
        msg: "Client updated with successful.",
      });
    } catch (error) {
      const { message, statusCode } = error as ApiError;

      return response.status(statusCode).json({ error: message });
    }
  }
}

export { UpdateClientController };
