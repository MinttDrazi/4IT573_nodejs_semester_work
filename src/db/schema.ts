import { sql } from "drizzle-orm";
import { int, check, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  email: text().notNull(),
  passwordHash: text().notNull(),
});

export const gamesTable = sqliteTable("games", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  image: text().notNull(),
});

export const userGamesTable = sqliteTable("user_games", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int()
    .notNull()
    .references(() => usersTable.id),
  gameId: int()
    .notNull()
    .references(() => gamesTable.id),
  status: text()
    .$type<"planned" | "playing" | "completed" | "on_hold" | "dropped">()
    .notNull(),
});

export const reviewsTable = sqliteTable(
  "reviews",
  {
    id: int().primaryKey({ autoIncrement: true }),
    userId: int()
      .notNull()
      .references(() => usersTable.id),
    gameId: int()
      .notNull()
      .references(() => gamesTable.id),
    rating: int().notNull(),
    reviewText: text(),
  },
  (table) => [
    check("rating_check_01", sql`${table.rating} <= 10`),
    check("rating_check_02", sql`${table.rating} >= 0`),
  ]
);

export const wishlistsTable = sqliteTable("wishlists", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int()
    .notNull()
    .references(() => usersTable.id),
  gameId: int()
    .notNull()
    .references(() => gamesTable.id),
});
