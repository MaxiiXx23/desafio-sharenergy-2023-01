import { Schema } from "mongoose";

const AddresSchema = new Schema({
  cep: {
    type: String,
    require: true,
  },
  public_place: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  complement: {
    type: String,
    require: false,
  },
  reference: {
    type: String,
    require: false,
  },
});

export { AddresSchema };
