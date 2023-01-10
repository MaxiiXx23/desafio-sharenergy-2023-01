import { ApiError } from "../../../../shared/errors/ApiError";
import { AccountModel } from "../../../account/model/AccountModel";
import { ClientModel } from "../../model/ClientModel";

interface IRequest {
  id: string;
  idClient: string;
  name: string;
  email: string;
  telefone: string;
  cpf: string;
}

class UpdateClientUseCase {
  async execute({ id, idClient, name, email, telefone, cpf }: IRequest) {
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

    const clientAlreadyExists = await ClientModel.findOne({ email });

    if (clientAlreadyExists && client.email !== email) {
      throw new ApiError("E-mail already in use.", 400);
    }

    await client.updateOne({
      name,
      email,
      telefone,
      cpf,
    });
  }
}

export { UpdateClientUseCase };
