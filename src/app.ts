import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Context } from "hono";

import { createMiddleware } from "hono/factory";
import { logout, signUp, singIn, verify } from "./handlers/authHandler";
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
  removeGameFromLibraryHandler,
} from "./handlers/libraryHandler";
import {
  addReviewHandler,
  editReviewHandler,
  getGameReviewForUserHandler,
  getGameReviewsHandler,
  removeReviewHandler,
} from "./handlers/reviewHandler";
import { requireAuthMiddleware } from "./middleware";

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

// Auth Middleware
const requireAuth = createMiddleware(requireAuthMiddleware);

// Health-check
app.get("/health", async (c: Context) => {
  return c.text("OK", 200);
});

// Auth endpoints
app.post("/api/signup", signUp);
app.post("/api/signin", singIn);
app.get("/api/logout", logout);

// Verify a signed-in user
app.get("/api/verify", verify);

// Game endpoints
app.get("/api/games", listGamesHandler);
app.get("/api/games/:gameId", getGameHandler);

// Library endpoints
app.get("/api/library/:userId", requireAuth, getUserLibraryHandler);
app.get(
  "/api/library/:userId/game/:gameId",
  requireAuth,
  getGameFromLibraryHandler
);
app.post(
  "/api/library/:userId/game/:gameId",
  requireAuth,
  changeGameStatusInLibraryHandler
);
app.delete(
  "/api/library/:userId/game/:gameId",
  requireAuth,
  removeGameFromLibraryHandler
);

// Wishlist endpoints
app.get("/api/wishlist/:userId", requireAuth, getWishlistHandler);
app.get(
  "/api/wishlist/:userId/game/:gameId",
  requireAuth,
  getGameFromWishlistHandler
);
app.post(
  "/api/wishlist/:userId/game/:gameId",
  requireAuth,
  addGameToWishlistHandler
);
app.delete(
  "/api/wishlist/:userId/game/:gameId",
  requireAuth,
  removeGameFromWishlistHandler
);

// Review endpoints
app.get("/api/review/:gameId", getGameReviewsHandler);
app.get(
  "/api/review/:userId/game/:gameId",
  requireAuth,
  getGameReviewForUserHandler
);
app.post("/api/review/:userId/game/:gameId", requireAuth, addReviewHandler);
app.put("/api/review/:userId/game/:gameId", requireAuth, editReviewHandler);
app.delete(
  "/api/review/:userId/game/:gameId",
  requireAuth,
  removeReviewHandler
);
