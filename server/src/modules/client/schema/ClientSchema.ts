import { Schema } from "mongoose";

const ClientSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  telefone: {
    type: String,
    require: true,
  },
  endereco: {
    type: String,
  },
  cpf: {
    type: String,
    require: true,
  },
});

export { ClientSchema };
