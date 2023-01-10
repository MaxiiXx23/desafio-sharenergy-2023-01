import { ApiError } from "../../../../shared/errors/ApiError";
import { AccountModel } from "../../../account/model/AccountModel";
import { ClientModel } from "../../model/ClientModel";

interface IRequest {
  id: string;
  name: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
}

class CreateClientUseCase {
  async execute({ id, name, email, telefone, endereco, cpf }: IRequest) {
    const user = await AccountModel.findById(id);

    if (!user) {
      throw new ApiError("User not found.", 400);
    }

    if (!user.isAdmin) {
      throw new ApiError("User haven't permition.", 401);
    }

    const clientData = {
      name,
      email,
      telefone,
      endereco,
      cpf,
    };

    await ClientModel.create(clientData);
  }
}

export { CreateClientUseCase };
