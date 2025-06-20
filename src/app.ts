import { Hono } from "hono";
import { cors } from "hono/cors";
import { createUser, getAllGames, getUser } from "./db/db";
import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { ERRORS, sendError } from "./errors";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { createMiddleware } from "hono/factory";

export const app = new Hono();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_MAX_AGE = 7 * 24 * 60 * 60;

// CORS Middleware
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ← tady
  })
);

// Health-check
app.get("/health", (c: Context) => {
  return c.text("OK", 200);
});

//TODO : Pridat kontrolu vstupu pred jejim zpracovanim
app.post("/api/signup", async (c: Context) => {
  const { data } = await c.req.json();

  const exists = await getUser(data.email);

  if (exists) {
    return sendError(c, ERRORS.USER_ALREADY_EXISTS);
  }

  const newUser = await createUser(data);

  return c.json(newUser, 201);
});

//TODO : Pridat kontrolu vstupu pred jejim zpracovanim
app.post("/api/signin", async (c: Context) => {
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
});

app.get("/api/verify", async (c) => {
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
});

const requireAuth = createMiddleware(async (c, next) => {
  const token = getCookie(c, "token");
  if (!token) {
    return sendError(c, ERRORS.UNAUTHORIZED);
  }

  try {
    jwt.verify(token, JWT_SECRET);
    await next();
  } catch (err) {
    return sendError(c, ERRORS.WRONG_PASSWORD);
  }
});

// Get all games
app.get("/api/games", async (c) => {
  const games = await getAllGames();

  return c.json(games);
});
