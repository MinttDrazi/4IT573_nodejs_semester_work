import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { reviewsTable } from "../schema";

export type reviewType = InferSelectModel<typeof reviewsTable>;

export type reviewInputType = InferInsertModel<typeof reviewsTable>;
