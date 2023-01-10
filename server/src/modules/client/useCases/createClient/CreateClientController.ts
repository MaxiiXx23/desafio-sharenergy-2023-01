import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/errors/ApiError";
import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, telefone, endereco, cpf } = request.body;
    const { id } = request.user;

    const createClientUseCase = container.resolve(CreateClientUseCase);

    try {
      await createClientUseCase.execute({
        id,
        name,
        email,
        telefone,
        endereco,
        cpf,
      });
      return response.status(201).json({ msg: "Client criado com sucesso." });
    } catch (error) {
      const { message, statusCode } = error as ApiError;

      return response.status(statusCode).json({ error: message });
    }
  }
}

export { CreateClientController };
