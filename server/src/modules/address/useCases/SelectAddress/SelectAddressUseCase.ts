import { ApiError } from "../../../../shared/errors/ApiError";
import { AccountModel } from "../../../account/model/AccountModel";
import { AddressModel } from "../../model/AddressModel";

interface IRequest {
  id: string;
  idAddress: string;
}

class SelectAddressUseCase {
  async execute({ id, idAddress }: IRequest) {
    const user = await AccountModel.findById(id);

    if (!user) {
      throw new ApiError("User not found.", 400);
    }

    if (!user.isAdmin) {
      throw new ApiError("User haven't permition", 401);
    }

    const address = await AddressModel.findById(idAddress);

    if (!address) {
      throw new ApiError("Address not found", 400);
    }

    return address;
  }
}

export { SelectAddressUseCase };
