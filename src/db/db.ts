import { db } from "./connection";
import { gamesTable } from "./schema";

export async function getAllGames() {
  const games = await db.select().from(gamesTable).all();
  return games;
}
