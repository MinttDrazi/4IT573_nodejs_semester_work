import { eq, inArray } from "drizzle-orm";
import { db } from "../connection";
import { gamesTable } from "../schema";

export async function getAllGames() {
  const games = await db.select().from(gamesTable).all();

  return games;
}

export async function getGamesByIds(gameIds: number[]) {
  const games = await db
    .select()
    .from(gamesTable)
    .where(inArray(gamesTable.id, gameIds))
    .all();

  return games;
}

export async function getGameById(id: number) {
  const game = await db
    .select()
    .from(gamesTable)
    .where(eq(gamesTable.id, id))
    .get();

  return game;
}
