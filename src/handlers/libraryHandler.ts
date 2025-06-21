import { Context } from "hono";
import {
  createLibraryItem,
  getLibrary,
  getLibraryItem,
  updateLibraryItem,
} from "../db/repositories/libraryRepository";
import { getGameById, getGamesByIds } from "../db/repositories/gameRepository";
import { ERRORS, sendError } from "../errors";

export async function getUserLibraryHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));

  if (isNaN(userId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const library = await getLibrary(userId);

  const gameIds = library.map((status) => status.gameId);

  const games = await getGamesByIds(gameIds);

  const statusMap = new Map<number, (typeof library)[0]["status"]>();
  library.forEach(({ gameId, status }) => {
    statusMap.set(gameId, status);
  });

  const gamesWithStatus = games.map((game) => ({
    ...game,
    status: statusMap.get(game.id),
  }));

  return c.json(gamesWithStatus, 200);
}

export async function getGameFromLibraryHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));
  const gameId = parseInt(c.req.param("gameId"));

  if (isNaN(userId) || isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);

  if (!game) {
    return sendError(c, ERRORS.NOT_FOUND);
  }

  const status = await getLibraryItem(gameId, userId);

  return c.json(status, 200);
}

export async function changeGameStatusInLibraryHandler(c: Context) {
  const userId = parseInt(c.req.param("userId"));
  const gameId = parseInt(c.req.param("gameId"));
  const { newStatus } = await c.req.json();

  if (isNaN(userId) || isNaN(gameId)) {
    return sendError(c, ERRORS.INVALID_PAYLOAD);
  }

  const game = await getGameById(gameId);
  if (!game) {
    return sendError(c, ERRORS.NOT_FOUND);
  }

  const status = await getLibraryItem(gameId, userId);
  if (status) {
    const gameStatus = await updateLibraryItem(status.id, newStatus);

    return c.json(gameStatus, 200);
  } else {
    const gameStatus = await createLibraryItem(gameId, userId, newStatus);

    return c.json(gameStatus);
  }
}
