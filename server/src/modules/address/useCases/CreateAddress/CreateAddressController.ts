import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/errors/ApiError";
import { CreateAddressUseCase } from "./CreateAddressUseCase";

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      cep,
      public_place,
      number,
      district,
      city,
      state,
      complement,
      reference,
    } = request.body;

    const { id } = request.user;

    const createAddressUseCase = container.resolve(CreateAddressUseCase);

    try {
      const adress_id = await createAddressUseCase.execute({
        id,
        cep,
        public_place,
        number,
        district,
        city,
        state,
        complement,
        reference,
      });
      return response.status(201).json({ adress_id });
    } catch (error) {
      const { message, statusCode } = error as ApiError;
      return response.status(statusCode).json({ error: message });
    }
  }
}

export { CreateAddressController };
