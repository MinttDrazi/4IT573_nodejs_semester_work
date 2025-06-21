import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Context } from "hono";

import { createMiddleware } from "hono/factory";
import { signUp, singIn, verify } from "./handlers/authHandler";
import { getGameHandler, listGamesHandler } from "./handlers/gameHandler";
import {
  addGameToWishlistHandler,
  getGameFromWishlistHandler,
  getWishlistHandler,
  removeGameFromWishlistHandler,
} from "./handlers/wishlistHandler";
import {
  changeGameStatusInLibraryHandler,
  getGameFromLibraryHandler,
  getUserLibraryHandler,
} from "./handlers/libraryHandler";

export const app = new Hono();

// CORS Middleware
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Health-check
app.get("/health", async (c: Context) => {
  return c.text("OK", 200);
});

app.post("/api/signup", signUp);

app.post("/api/signin", singIn);

app.get("/api/verify", verify);

//TODO: Vyresit ten middleware
// const requireAuth = createMiddleware(async (c, next) => {
//   const token = getCookie(c, "token");
//   if (!token) {
//     return sendError(c, ERRORS.UNAUTHORIZED);
//   }

//   try {
//     jwt.verify(token, JWT_SECRET);
//     await next();
//   } catch (err) {
//     return sendError(c, ERRORS.UNAUTHORIZED);
//   }
// });

//*DONE: Get all games
app.get("/api/games", listGamesHandler);

//*DONE: Get one game
app.get("/api/games/:gameId", getGameHandler);

//*DONE: Get all user's games in library
app.get("/api/library/:userId", getUserLibraryHandler);

//*DONE: Get game item from user's library
app.get("/api/library/:userId/game/:gameId", getGameFromLibraryHandler);

//*DONE: Change game status in user's library
app.post("/api/library/:userId/game/:gameId", changeGameStatusInLibraryHandler);

//*DONE: Get user's wishlist
app.get("/api/wishlist/:userId", getWishlistHandler);

//*DONE: Get game from the wishlist
app.get("/api/wishlist/:userId/game/:gameId", getGameFromWishlistHandler);

//*DONE: Add game to the wishlist
app.post("/api/wishlist/:userId/game/:gameId", addGameToWishlistHandler);

//*ODNE: Remove game from the wishlist
app.delete("/api/wishlist/:userId/game/:gameId", removeGameFromWishlistHandler);

//!NOT IMPLEMENTED: create a new review for a game
app.post("/api/review/:id", async (c) => {
  return c.json("not yet implemented");
});

//!NOT IMPLEMENTED: create a new review for a game
app.post("/api/review/:id", async (c) => {
  return c.json("not yet implemented");
});
