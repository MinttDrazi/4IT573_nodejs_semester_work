import { libraryTable } from "../schema";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export type libraryType = InferSelectModel<typeof libraryTable>;

export type libraryInputType = InferInsertModel<typeof libraryTable>;
