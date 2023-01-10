import { model } from "mongoose";

import { AddresSchema } from "../schema/AddressSchema";

const AddressModel = model("Address", AddresSchema);

export { AddressModel };
