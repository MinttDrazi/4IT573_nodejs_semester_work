import jwt from "jsonwebtoken";
import { JWT_MAX_AGE, JWT_SECRET } from "../src/config";

export function getTestAuthCookie(payload: { id: number; email: string }) {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_MAX_AGE,
  });
  const tokenCookie = `token=${token}`;

  return tokenCookie;
}
