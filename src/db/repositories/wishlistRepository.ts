import { and, eq } from "drizzle-orm";
import { db } from "../connection";
import { wishlistsTable } from "../schema";

export async function getUserWishlist(userId: number) {
  const wishlist = await db
    .select()
    .from(wishlistsTable)
    .where(eq(wishlistsTable.userId, userId))
    .all();

  return wishlist;
}

export async function getWishlistItem(userId: number, gameId: number) {
  const game = await db
    .select()
    .from(wishlistsTable)
    .where(
      and(eq(wishlistsTable.userId, userId), eq(wishlistsTable.gameId, gameId))
    )
    .get();

  return game;
}

export async function createWishlistItem(userId: number, gameId: number) {
  const item = await db
    .insert(wishlistsTable)
    .values({
      userId: userId,
      gameId: gameId,
    })
    .returning()
    .get();

  return item;
}

export async function deleteWishlistItem(id: number) {
  const item = await db.delete(wishlistsTable).where(eq(wishlistsTable.id, id));
  return item;
}
