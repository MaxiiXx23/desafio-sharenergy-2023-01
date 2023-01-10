import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/errors/ApiError";
import { UpdateAddressUseCase } from "./UpdateAddressUseCase";

class UpdateAddressControler {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { idAddress } = request.params;
    const {
      cep,
      public_place,
      number,
      city,
      state,
      district,
      complement,
      reference,
    } = request.body;

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);

    try {
      await updateAddressUseCase.execute({
        id,
        idAddress,
        cep,
        public_place,
        number,
        city,
        state,
        district,
        complement,
        reference,
      });
      return response.json({ msg: "Address updated with successful." });
    } catch (error) {
      const { message, statusCode } = error as ApiError;
      return response.status(statusCode).json({ error: message });
    }
  }
}

export { UpdateAddressControler };
