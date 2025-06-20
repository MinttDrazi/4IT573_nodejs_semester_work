import type { InferModel } from "drizzle-orm";
import { userGamesTable } from "../../src/db/schema";

type NewUserGame = InferModel<typeof userGamesTable, "insert">;

export const userGamesRecords: NewUserGame[] = [
  {
    id: 1,
    userId: 1,
    gameId: 1,
    status: "planned",
  },
  {
    id: 2,
    userId: 1,
    gameId: 2,
    status: "playing",
  },
  {
    id: 3,
    userId: 1,
    gameId: 3,
    status: "completed",
  },
  {
    id: 4,
    userId: 2,
    gameId: 2,
    status: "playing",
  },
];
