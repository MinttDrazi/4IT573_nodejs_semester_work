import { Context } from "hono";
import { getAllGames, getGameById } from "../db/repositories/gameRepository";
import { ERRORS, sendError } from "../errors";

export async function listGamesHandler(c: Context) {
  const games = await getAllGames();

  return c.json(games, 200);
}

export async function getGameHandler(c: Context) {
  const gameId = parseInt(c.req.param("gameId"));

  if (isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return sendError(c, ERRORS.NOT_FOUND);
  }

  return c.json(game);
}
