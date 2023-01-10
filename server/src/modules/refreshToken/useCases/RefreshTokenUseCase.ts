import dayjs from "dayjs";
import { JwtPayload, sign, verify } from "jsonwebtoken";

import { auth } from "../../../config/auth";
import { ApiError } from "../../../shared/errors/ApiError";
import { RefreshTokenModal } from "../model/refreshTokenModal";

interface IRequest {
  refreshToken: string;
}

interface IPayLoad extends JwtPayload {
  username: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

class RefreshTokenUseCase {
  async execute({ refreshToken }: IRequest): Promise<ITokenResponse> {
    const { username, sub } = verify(
      refreshToken,
      auth.secret_key_refresh_token
    ) as IPayLoad;

    const userId = sub;

    const userRefreshToken = await RefreshTokenModal.findOne({
      userId,
      refreshToken,
    });

    if (!userRefreshToken) {
      throw new ApiError("Refresh Token does not found!", 400);
    }
    const dateCurrent = new Date().toDateString();
    const diffDaysExperies = dayjs(userRefreshToken.expiresDate).diff(
      dateCurrent,
      "day"
    );

    if (diffDaysExperies <= 0) {
      throw new ApiError("Refresh Token expired!", 498);
    }

    await userRefreshToken.delete();

    const expiresDate = dayjs().add(auth.expires_in_refresh_token_day, "days");
    const newRefreshToken = sign({ username }, auth.secret_key_refresh_token, {
      subject: userId,
      expiresIn: auth.expires_in_refresh_token,
    });

    const newToken = sign({}, auth.secret_key_JWT, {
      subject: userId,
      expiresIn: auth.expires_in_token,
    });

    await RefreshTokenModal.create({
      userId,
      refreshToken: newRefreshToken,
      expiresDate,
    });

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }
}

export { RefreshTokenUseCase };
