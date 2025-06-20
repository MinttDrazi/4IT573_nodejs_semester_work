import { libraryType } from "../../src/db/model/libraryModel";

export const libraryRecords: libraryType[] = [
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
