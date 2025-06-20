import * as argon2 from "argon2";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "./connection";
import {
  gamesTable,
  userGamesTable,
  usersTable,
  wishlistsTable,
} from "./schema";
import { status } from "./model/userGames";

export async function getUser(email: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .get();
  return user;
}

//TODO : Dam nekam jinam, nadefinovat typy z databaze pro jejich praci
type newUserInput = {
  username: string;
  email: string;
  password: string;
};

export async function createUser(data: newUserInput) {
  const passwordHash = await argon2.hash(data.password);
  const user = await db
    .insert(usersTable)
    .values({
      username: data.username,
      email: data.email,
      passwordHash: passwordHash,
    })
    .returning()
    .get();

  return user;
}

export async function getAllGames() {
  const games = await db.select().from(gamesTable).all();
  return games;
}

export async function getGamesbyIds(gameIds: number[]) {
  const games = await db
    .select()
    .from(gamesTable)
    .where(inArray(gamesTable.id, gameIds))
    .all();

  return games;
}

export async function getGame(id: number) {
  const game = await db
    .select()
    .from(gamesTable)
    .where(eq(gamesTable.id, id))
    .get();

  return game;
}

export async function getGameStatuses(userId: number) {
  const status = await db
    .select()
    .from(userGamesTable)
    .where(eq(userGamesTable.userId, userId))
    .all();

  return status;
}

export async function getGameStatus(gameId: number, userId: number) {
  const status = await db
    .select()
    .from(userGamesTable)
    .where(
      and(eq(userGamesTable.userId, userId), eq(userGamesTable.gameId, gameId))
    )
    .get();

  return status;
}

export async function createGameStatus(
  gameId: number,
  userId: number,
  newStatus: status
) {
  const status = await db
    .insert(userGamesTable)
    .values({
      userId: userId,
      gameId: gameId,
      status: newStatus,
    })
    .returning()
    .get();

  return status;
}

export async function updateGameStatus(id: number, newStatus: status) {
  const status = await db
    .update(userGamesTable)
    .set({
      status: newStatus,
    })
    .where(eq(userGamesTable.id, id))
    .returning()
    .get();

  return status;
}

export async function getUserWishlist(userId: number) {
  const wishlist = await db
    .select()
    .from(wishlistsTable)
    .where(eq(wishlistsTable.userId, userId))
    .all();

  return wishlist;
}

export async function getGameFromWishlist(userId: number, gameId: number) {
  const game = await db
    .select()
    .from(wishlistsTable)
    .where(
      and(eq(wishlistsTable.userId, userId), eq(wishlistsTable.gameId, gameId))
    )
    .get();

  return game;
}

export async function addGameToWishlist(userId: number, gameId: number) {
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

export async function removeGameFromWishlist(id: number) {
  const item = await db.delete(wishlistsTable).where(eq(wishlistsTable.id, id));
  return item;
}
