import { compareSync } from "bcryptjs";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";

import { auth } from "../../../config/auth";
import { ApiError } from "../../../shared/errors/ApiError";
import { RefreshTokenModal } from "../../refreshToken/model/refreshTokenModal";
import { AccountModel } from "../model/AccountModel";

interface IRequest {
  username: string;
  password: string;
}

interface ITokenResponse {
  user: {
    username: string;
  };
  token: string;
  refreshToken: string;
}

class AuthenticateUseCase {
  async execute({ username, password }: IRequest) {
    const user = await AccountModel.findOne({ username });

    if (!user) {
      throw new ApiError("User not found.", 400);
    }
    const { _id, password: passwordHash } = user;

    const userId = String(_id);

    const passwordCompare = compareSync(password, passwordHash);

    if (!passwordCompare) {
      throw new ApiError("Incorrect password.", 401);
    }

    const refreshTokenAlreadyExists = await RefreshTokenModal.findOne({
      userId: user.id,
    });

    if (refreshTokenAlreadyExists) {
      refreshTokenAlreadyExists.delete();
    }

    const token = sign({}, auth.secret_key_JWT, {
      subject: userId,
      expiresIn: auth.expires_in_token,
    });

    const expiresDate = dayjs().add(auth.expires_in_refresh_token_day, "days");

    const refreshToken = sign({ username }, auth.secret_key_refresh_token, {
      subject: userId,
      expiresIn: auth.expires_in_refresh_token,
    });

    await RefreshTokenModal.create({
      userId,
      refreshToken,
      expiresDate,
    });

    const tokenResponse: ITokenResponse = {
      user: {
        username,
      },
      token,
      refreshToken,
    };
    return tokenResponse;
  }
}

export { AuthenticateUseCase };
