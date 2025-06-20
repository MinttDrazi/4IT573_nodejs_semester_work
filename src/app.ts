import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  addGameToWishlist,
  createGameStatus,
  createUser,
  getAllGames,
  getGame,
  getGameFromWishlist,
  getGamesbyIds,
  getGameStatus,
  getGameStatuses,
  getUser,
  getUserWishlist,
  removeGameFromWishlist,
  updateGameStatus,
} from "./db/db";
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
    return sendError(c, ERRORS.UNAUTHORIZED);
  }
});

// Get all games
app.get("/api/games", async (c) => {
  const games = await getAllGames();

  return c.json(games);
});

// Get one games
app.get("/api/games/:id", async (c) => {
  const { id } = c.req.param();
  const gameId = parseInt(id);

  const game = await getGame(gameId);

  return c.json(game);
});

//get all user's games in library
app.get("/api/library/:userId", async (c) => {
  const userId = parseInt(c.req.param("userId"));

  const gameStatuses = await getGameStatuses(userId);

  const gameIds = gameStatuses.map((status) => status.gameId);

  const games = await getGamesbyIds(gameIds);

  return c.json(games, 200);
});

// get game status for user's game
app.get("/api/games/:id/status", async (c) => {
  const { id } = c.req.param();
  const userId = c.req.query("userId");

  const gameId = parseInt(id);
  const userIdParsed = userId ? parseInt(userId) : 0;

  const game = await getGame(gameId);

  if (!game) {
    return sendError(c, ERRORS.NOT_FOUND);
  }

  const status = await getGameStatus(gameId, userIdParsed);

  return c.json(status, 200);
});

// change status for a game
app.post("/api/games/:id/status", async (c) => {
  // zpracovat id hry
  const { id } = c.req.param();
  const gameId = parseInt(id);

  // z tela si vzit novy status a userId
  const { userId, newStatus } = await c.req.json();

  //najit hru
  const game = await getGame(gameId);
  if (!game) {
    return sendError(c, ERRORS.NOT_FOUND);
  }

  // najit status hry
  const status = await getGameStatus(gameId, userId);
  if (status) {
    // pokud je, jenom ho zmenit.
    const gameStatus = await updateGameStatus(status.id, newStatus);

    return c.json(gameStatus, 200);
  } else {
    // pokud neni, vytvorit novy
    const gameStatus = await createGameStatus(gameId, userId, newStatus);

    return c.json(gameStatus);
  }
});

// Find game in wishlist
app.get("/api/games/:id/wishlist", async (c) => {
  const { id } = c.req.param();
  const userId = c.req.query("userId");

  const gameId = parseInt(id);
  const userIdParsed = userId ? parseInt(userId) : 0;

  // find game
  const game = await getGame(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  // find game in wishlist
  const inWishlist = await getGameFromWishlist(userIdParsed, gameId);
  if (!inWishlist) {
    return sendError(c, ERRORS.NOT_FOUND);
  }

  return c.json(inWishlist, 200);
});

// get wishlist for a user
app.get("/api/wishlist/:id", async (c) => {
  // :id => userId
  const { id } = c.req.param();
  const userId = parseInt(id);

  const wishlist = await getUserWishlist(userId);
  // get wishlist from database (array of games)

  const gameIds = wishlist.map((game) => game.gameId);

  // return games
  const games = await getGamesbyIds(gameIds);

  return c.json(games, 200);
});

// add game to the wishlist
app.post("/api/wishlist/:id", async (c) => {
  // get userId
  const { id } = c.req.param();
  const userId = parseInt(id);

  // get gameId from a body
  const { gameId } = await c.req.json();

  // find game
  const game = await getGame(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  // find game in wishlist
  const inWishlist = await getGameFromWishlist(userId, gameId);
  if (inWishlist) {
    return sendError(c, ERRORS.ITEM_ALREADY_EXISTS);
  }

  // add game to wishlist
  const item = await addGameToWishlist(userId, gameId);

  // return success
  return c.json(item, 200);
});

// Remove game from the wishlist
app.delete("/api/wishlist/:userId/game/:gameId", async (c) => {
  // get userId and gameId from params
  const { userId, gameId } = c.req.param();
  const userIdParsed = parseInt(userId);
  const gameIdParsed = parseInt(gameId);

  // find game
  const game = await getGame(gameIdParsed);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  // remove game from wishlist
  const wishlist = await getGameFromWishlist(userIdParsed, gameIdParsed);
  if (!wishlist) {
    return sendError(c, ERRORS.NOT_FOUND);
  }
  await removeGameFromWishlist(wishlist.id);

  // return success
  return c.json("removed", 200);
});

// create a new review for a game
app.post("/api/review/:id", async (c) => {
  return c.json("not yet implemented");
});

// create a new review for a game
app.post("/api/review/:id", async (c) => {
  return c.json("not yet implemented");
});
