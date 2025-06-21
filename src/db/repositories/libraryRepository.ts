import { and, eq } from "drizzle-orm";
import { db } from "../connection";
import { libraryTable } from "../schema";
import { libraryType } from "../model/libraryModel";

export async function getLibrary(userId: number) {
  const library = await db
    .select()
    .from(libraryTable)
    .where(eq(libraryTable.userId, userId))
    .all();

  return library;
}

export async function getLibraryItem(gameId: number, userId: number) {
  const item = await db
    .select()
    .from(libraryTable)
    .where(
      and(eq(libraryTable.userId, userId), eq(libraryTable.gameId, gameId))
    )
    .get();

  return item;
}

export async function createLibraryItem(
  gameId: number,
  userId: number,
  newStatus: libraryType["status"]
) {
  const item = await db
    .insert(libraryTable)
    .values({
      userId: userId,
      gameId: gameId,
      status: newStatus,
    })
    .returning()
    .get();

  return item;
}

export async function updateLibraryItem(
  id: number,
  newStatus: libraryType["status"]
) {
  const item = await db
    .update(libraryTable)
    .set({
      status: newStatus,
    })
    .where(eq(libraryTable.id, id))
    .returning()
    .get();

  return item;
}

export async function deleteLibraryItem(id: number) {
  const item = await db.delete(libraryTable).where(eq(libraryTable.id, id));
  return item;
}
