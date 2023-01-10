import { model } from "mongoose";

import { AccountSchema } from "../schema/AccountSchema";

const AccountModel = model("Account", AccountSchema);

export { AccountModel };
