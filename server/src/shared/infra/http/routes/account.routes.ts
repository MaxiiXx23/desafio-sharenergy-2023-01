import { Router } from "express";

import { AuthenticateController } from "../../../../modules/account/useCases/AuthenticateController";
import { RefreshTokenController } from "../../../../modules/refreshToken/useCases/RefreshTokenController";

const authenticateController = new AuthenticateController();
const refreshTokenController = new RefreshTokenController();

const accountRoutes = Router();

accountRoutes.post("/authenticate", authenticateController.handle);
accountRoutes.post("/refreshToken", refreshTokenController.handle);

export { accountRoutes };
