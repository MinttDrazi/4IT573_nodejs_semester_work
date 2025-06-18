import { db } from "../src/db/connection";
import { games } from "../src/db/schema";
import { gameRecords } from "./data/games";

export async function seed() {
  console.log("Starting seed function ");

  await db.insert(games).values(gameRecords);

  console.log(`Sample data inserted`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error in seed func:", err);
  process.exit(1);
});
