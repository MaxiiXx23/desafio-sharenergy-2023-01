import { model } from "mongoose";

import { refreshTokenSchema } from "../schema/refreshTokenSchema";

const RefreshTokenModal = model("RefreshToken", refreshTokenSchema);

export { RefreshTokenModal };
