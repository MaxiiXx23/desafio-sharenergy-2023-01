import { ApiError } from "../../../../shared/errors/ApiError";
import { AccountModel } from "../../../account/model/AccountModel";
import { AddressModel } from "../../model/AddressModel";

interface IRequest {
  id: string;
  idAddress: string;
  cep: string;
  public_place: string;
  number: string;
  city: string;
  state: string;
  district: string;
  complement: string;
  reference: string;
}

class UpdateAddressUseCase {
  async execute({
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
  }: IRequest) {
    const user = await AccountModel.findById(id);
    if (!user) {
      throw new ApiError("User not found", 400);
    }

    if (!user.isAdmin) {
      throw new ApiError("User haven't permition.", 401);
    }

    const address = await AddressModel.findById(idAddress);

    if (!address) {
      throw new ApiError("Address not found.", 400);
    }

    await address.update({
      cep,
      public_place,
      number,
      city,
      state,
      district,
      complement,
      reference,
    });
  }
}

export { UpdateAddressUseCase };
