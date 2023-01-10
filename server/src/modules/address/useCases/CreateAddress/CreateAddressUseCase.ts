import { ApiError } from "../../../../shared/errors/ApiError";
import { AccountModel } from "../../../account/model/AccountModel";
import { AddressModel } from "../../model/AddressModel";

interface IRequest {
  id: string;
  cep: string;
  public_place: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement: string;
  reference: string;
}

class CreateAddressUseCase {
  async execute({
    id,
    cep,
    public_place,
    number,
    district,
    city,
    state,
    complement,
    reference,
  }: IRequest) {
    const user = await AccountModel.findById(id);

    if (!user) {
      throw new ApiError("User not found.", 400);
    }

    if (!user.isAdmin) {
      throw new ApiError("User haven't permition.", 401);
    }

    const address = await AddressModel.create({
      cep,
      public_place,
      number,
      district,
      city,
      state,
      complement,
      reference,
    });

    const address_id = address.id;

    return address_id;
  }
}

export { CreateAddressUseCase };
