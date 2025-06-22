import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { ERRORS, sendError } from "./errors";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export async function requireAuthMiddleware(c: Context, next: Next) {
  const token = getCookie(c, "token");
  if (!token) {
    return sendError(c, ERRORS.UNAUTHORIZED);
  }

  try {
    jwt.verify(token, JWT_SECRET);
    await next();
  } catch (err) {
    return sendError(c, ERRORS.UNAUTHORIZED);
  }
}
