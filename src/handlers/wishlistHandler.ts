import { Context } from "hono";
import {
  createWishlistItem,
  deleteWishlistItem,
  getUserWishlist,
  getWishlistItem,
} from "../db/repositories/wishlistRepository";
import { getGameById, getGamesByIds } from "../db/repositories/gameRepository";
import { ERRORS, sendError } from "../errors";

export async function getWishlistHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));

  if (isNaN(userId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const wishlist = await getUserWishlist(userId);

  const gameIds = wishlist.map((game) => game.gameId);

  const games = await getGamesByIds(gameIds);

  return c.json(games, 200);
}

export async function getGameFromWishlistHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));
  const gameId = parseInt(c.req.param("gameId"));

  if (isNaN(userId) || isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  const inWishlist = await getWishlistItem(userId, gameId);
  if (!inWishlist) {
    return c.json({}, 200);
  }

  return c.json(inWishlist, 200);
}

export async function addGameToWishlistHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));
  const gameId = parseInt(c.req.param("gameId"));

  if (isNaN(userId) || isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  const inWishlist = await getWishlistItem(userId, gameId);
  if (inWishlist) {
    return sendError(c, ERRORS.ITEM_ALREADY_EXISTS);
  }

  const item = await createWishlistItem(userId, gameId);

  return c.json(item, 200);
}

export async function removeGameFromWishlistHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));
  const gameId = parseInt(c.req.param("gameId"));

  if (isNaN(userId) || isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  const wishlist = await getWishlistItem(userId, gameId);
  if (!wishlist) {
    return sendError(c, ERRORS.NOT_FOUND);
  }
  await deleteWishlistItem(wishlist.id);

  return c.json("ok", 200);
}
