import * as argon2 from "argon2";
import { eq } from "drizzle-orm";
import { db } from "./connection";
import { gamesTable, usersTable } from "./schema";

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
