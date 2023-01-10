const auth = {
  // token
  secret_key_JWT: process.env.SECRET_KEY_JWT,
  expires_in_token: process.env.EXPIRES_IN_TOKEN,
  // refreshToken
  secret_key_refresh_token: process.env.SECRET_KEY_REFRESH_TOKEN_JWT,
  expires_in_refresh_token: process.env.EXPIRES_IN_REFRESH_TOKEN,
  expires_in_refresh_token_day: 7,
};

export { auth };
