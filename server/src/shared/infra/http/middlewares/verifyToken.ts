import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "../../../../config/auth";

interface IPayload {
  sub: string;
}

function verifyToken(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(400).json({ error: "ID user is missing." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, auth.secret_key_JWT) as IPayload;

    request.user = {
      id: userId,
    };

    return next();
  } catch (error) {
    const { message } = error as Error;
    return response.status(500).json({ error: message });
  }
}

export { verifyToken };
