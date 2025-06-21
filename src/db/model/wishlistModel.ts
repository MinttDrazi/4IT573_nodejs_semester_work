import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { wishlistsTable } from "../schema";

export type wishlistType = InferSelectModel<typeof wishlistsTable>;

export type wishlistInputType = InferInsertModel<typeof wishlistsTable>;
