import { Router } from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { accountRoutes } from "./account.routes";
import { addressRoutes } from "./address.routes";
import { clientRoutes } from "./client.routes";

const appRoutes = Router();

appRoutes.use("/client", verifyToken, clientRoutes);
appRoutes.use("/account", accountRoutes);
appRoutes.use("/address", addressRoutes);

export { appRoutes };
