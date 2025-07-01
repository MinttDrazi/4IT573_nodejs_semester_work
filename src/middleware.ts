import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { ERRORS, sendError } from "./errors";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export async function requireAuthMiddleware(c: Context, next: Next) {
  const token = getCookie(c, "token");
  const userId = parseInt(c.req.param("userId"));

  if (!token) {
    return sendError(c, ERRORS.UNAUTHORIZED);
  }

  if (isNaN(userId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { id } = decoded as { id: string };
    if (parseInt(id) === userId) {
      await next();
    } else {
      return sendError(c, ERRORS.UNAUTHORIZED);
    }
  } catch (err) {
    return sendError(c, ERRORS.UNAUTHORIZED);
  }
}
