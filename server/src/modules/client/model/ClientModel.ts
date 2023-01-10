import { model } from "mongoose";

import { ClientSchema } from "../schema/ClientSchema";

const ClientModel = model("Client", ClientSchema);

export { ClientModel };
