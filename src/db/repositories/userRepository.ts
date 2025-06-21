import { eq } from "drizzle-orm";
import { db } from "../connection";
import { usersTable } from "../schema";
import { userInputType } from "../model/userModel";
import * as argon2 from "argon2";

export async function getUser(email: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .get();
  return user;
}

export async function createUser(data: userInputType) {
  const passwordHash = await argon2.hash(data.passwordHash);
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
