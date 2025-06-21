import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { usersTable } from "../schema";

export type userType = InferSelectModel<typeof usersTable>;

export type userInputType = InferInsertModel<typeof usersTable>;
