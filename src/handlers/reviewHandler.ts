import { Context } from "hono";
import { ERRORS, sendError } from "../errors";
import { getGameById } from "../db/repositories/gameRepository";
import {
  createReview,
  deleteReview,
  getReviewByGameAndUser,
  getReviewsByGameId,
  updateReview,
} from "../db/repositories/reviewRepository";

export async function getGameReviewsHandler(c: Context) {
  const gameId = parseInt(c.req.param("gameId"));

  if (isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  const reviews = await getReviewsByGameId(gameId);

  return c.json(reviews, 200);
}

export async function getGameReviewForUserHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));
  const gameId = parseInt(c.req.param("gameId"));

  if (isNaN(userId) || isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  const review = await getReviewByGameAndUser(userId, gameId);
  if (!review) {
    return c.json({}, 200);
  }

  return c.json(review, 200);
}

export async function addReviewHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));
  const gameId = parseInt(c.req.param("gameId"));
  const data = await c.req.json();

  if (isNaN(userId) || isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  const exists = await getReviewByGameAndUser(userId, gameId);
  if (exists) {
    return sendError(c, ERRORS.ITEM_ALREADY_EXISTS);
  }

  const review = await createReview(userId, gameId, data);

  return c.json(review, 200);
}

export async function editReviewHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));
  const gameId = parseInt(c.req.param("gameId"));
  const data = await c.req.json();

  if (isNaN(userId) || isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  const exists = await getReviewByGameAndUser(userId, gameId);
  if (!exists) {
    return sendError(c, ERRORS.NOT_FOUND);
  }

  const review = await updateReview(exists.id, data);

  return c.json(review, 200);
}

export async function removeReviewHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));
  const gameId = parseInt(c.req.param("gameId"));

  if (isNaN(userId) || isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return c.json(c, ERRORS.NOT_FOUND);
  }

  const exists = await getReviewByGameAndUser(userId, gameId);
  if (!exists) {
    return sendError(c, ERRORS.NOT_FOUND);
  }

  await deleteReview(exists.id);

  return c.json("ok", 200);
}
