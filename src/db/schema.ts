import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
