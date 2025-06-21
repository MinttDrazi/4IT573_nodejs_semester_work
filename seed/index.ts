import { db } from "../src/db/connection";
import {
  gamesTable,
  reviewsTable,
  libraryTable,
  usersTable,
  wishlistsTable,
} from "../src/db/schema";
import { gameRecords } from "./data/games";
import { libraryRecords } from "./data/library";
import { reviewsRecords } from "./data/reviews";
import { userRecords } from "./data/users";
import { wishlistsRecords } from "./data/wishlists";

export async function seed() {
  console.log("Starting seed function ");

  await db.delete(libraryTable);
  await db.delete(reviewsTable);
  await db.delete(wishlistsTable);
  await db.delete(gamesTable);
  await db.delete(usersTable);
  console.log("Cleaned database, seeding new data");

  await db.insert(usersTable).values(userRecords);
  console.log("Sample users inserted");

  await db.insert(gamesTable).values(gameRecords);
  console.log("Sample games inserted");

  await db.insert(libraryTable).values(libraryRecords);
  console.log("Sample statuses inserted");

  await db.insert(wishlistsTable).values(wishlistsRecords);
  console.log("Sample wishlists inserted");

  await db.insert(reviewsTable).values(reviewsRecords);
  console.log("Sample reviews inserted");

  console.log("Finished seed function");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error in seed func:", err);
  process.exit(1);
});
