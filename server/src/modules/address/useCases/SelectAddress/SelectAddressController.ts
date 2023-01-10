import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/errors/ApiError";
import { SelectAddressUseCase } from "./SelectAddressUseCase";

class SelectAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { idAddress } = request.params;

    const selectAddressUseCase = container.resolve(SelectAddressUseCase);

    try {
      const address = await selectAddressUseCase.execute({ id, idAddress });

      return response.json(address);
    } catch (error) {
      const { message, statusCode } = error as ApiError;
      return response.status(statusCode).json({ error: message });
    }
  }
}

export { SelectAddressController };
