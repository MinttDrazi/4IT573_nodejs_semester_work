import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { DB_FILE } from "./src/config";

export default defineConfig({
  dialect: "sqlite",
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: DB_FILE!,
  },
});
