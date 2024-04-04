import jwt from "jsonwebtoken"
import moment from "moment"
import { env } from "../config/env"
import { NotFoundError } from "../shared/error";

export const generateToken = (
    userId: string,
    expires: Date,
    type: "ACCESS",
    secret = env.JWT_SECRET
  ) => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: moment(expires).unix(),
      type,
    };
    const token = jwt.sign(payload, secret);
    return token;
  };

export const verifyToken = (token: string, secret = env.JWT_SECRET) => {
    try {
      const payload = jwt.verify(token, secret);
      return payload;
    } catch (error) {
      throw new NotFoundError("Invalid token");
    }
  };

export const generateAuthTokens = (userId: string) => {
    const expires = moment().add(env.JWT_EXPIRES_IN, "minutes").toDate();
    const accessToken = generateToken(
      userId,
      expires,
      "ACCESS",
      env.JWT_SECRET
    );
    return {
        id: userId,
        token: {
            access: accessToken,
            expires,
        },
        }
    }