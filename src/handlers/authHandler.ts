import { Context } from "hono";
import { createUser, getUser } from "../db/repositories/userRepository";
import { ERRORS, sendError } from "../errors";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { JWT_MAX_AGE, JWT_SECRET } from "../config";
import { getCookie, setCookie } from "hono/cookie";

//TODO : Pridat kontrolu vstupu pred jejim zpracovanim
export async function signUp(c: Context) {
  const { data } = await c.req.json();

  const exists = await getUser(data.email);
  if (exists) {
    return sendError(c, ERRORS.USER_ALREADY_EXISTS);
  }

  const newUser = await createUser(data);

  return c.json(newUser, 201);
}

//TODO : Pridat kontrolu vstupu pred jejim zpracovanim
export async function singIn(c: Context) {
  const data = await c.req.json();

  const user = await getUser(data.email);
  if (!user) {
    return sendError(c, ERRORS.USER_DOESNT_EXIST);
  }

  const valid = await argon2.verify(user.passwordHash, data.password);
  if (!valid) {
    return sendError(c, ERRORS.WRONG_PASSWORD);
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_MAX_AGE,
  });

  setCookie(c, "token", token, {
    httpOnly: true,
    path: "/",
    maxAge: JWT_MAX_AGE,
  });

  return c.json("OK", 200);
}

export async function verify(c: Context) {
  const token = getCookie(c, "token");
  if (!token) {
    return sendError(c, ERRORS.UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { id, email } = decoded as { id: string; email: string };

    return c.json({ id, email }, 200);
  } catch (err) {
    return sendError(c, ERRORS.UNAUTHORIZED);
  }
}
