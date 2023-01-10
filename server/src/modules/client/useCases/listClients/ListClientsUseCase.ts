import { ApiError } from "../../../../shared/errors/ApiError";
import { AccountModel } from "../../../account/model/AccountModel";
import { ClientModel } from "../../model/ClientModel";

class ListClientsUseCase {
  async execute(id: string) {
    const user = await AccountModel.findById(id);
    if (!user) {
      throw new ApiError("User not found", 400);
    }
    if (!user.isAdmin) {
      throw new ApiError("User haven't permition.", 401);
    }

    const allClients = await ClientModel.find();
    return allClients;
  }
}

export { ListClientsUseCase };
