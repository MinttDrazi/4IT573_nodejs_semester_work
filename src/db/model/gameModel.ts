import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { gamesTable } from "../schema";

export type gameType = InferSelectModel<typeof gamesTable>;

export type gameInputType = InferInsertModel<typeof gamesTable>;
