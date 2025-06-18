import { Hono } from "hono";
import { cors } from "hono/cors";
import { getAllGames } from "./db/db";

export const app = new Hono();

// CORS Middleware
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Health-check
app.get("/health", (c) => {
  return c.text("OK", 200);
});

// Get all games
app.get("/api/games", async (c) => {
  const games = await getAllGames();

  return c.json(games);
});
