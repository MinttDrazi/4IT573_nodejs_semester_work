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

export async function createUser(
  username: string,
  email: string,
  password: string
) {
  const passwordHash = await argon2.hash(password);
  const user = await db
    .insert(usersTable)
    .values({
      username: username,
      email: email,
      passwordHash: passwordHash,
    })
    .returning()
    .get();

  return user;
}
