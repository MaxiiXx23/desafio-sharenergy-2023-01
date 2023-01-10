import { ApiError } from "../../../../shared/errors/ApiError";
import { AccountModel } from "../../../account/model/AccountModel";
import { AddressModel } from "../../../address/model/AddressModel";
import { ClientModel } from "../../model/ClientModel";

interface IRequest {
  id: string;
  idClient: string;
}

class DeleteClientUseCase {
  async execute({ id, idClient }: IRequest) {
    const user = await AccountModel.findById(id);

    if (!user) {
      throw new ApiError("User not found.", 400);
    }

    if (!user.isAdmin) {
      throw new ApiError("User haven't permition.", 401);
    }
    const client = await ClientModel.findById(idClient);

    if (!client) {
      throw new ApiError("Client not found.", 400);
    }
    await AddressModel.findByIdAndDelete(client.endereco);
    await client.delete();
  }
}

export { DeleteClientUseCase };
