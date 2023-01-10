import { Schema } from "mongoose";

const refreshTokenSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
    require: true,
  },
  expiresDate: {
    type: String,
    require: true,
  },
});

export { refreshTokenSchema };
