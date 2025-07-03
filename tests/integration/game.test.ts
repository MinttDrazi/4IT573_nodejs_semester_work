import { expect, test } from "vitest";
import { app } from "../../src/app";
import { gameRecords } from "../../seed/data/games";

test("GET /api/games", async () => {
  const res = await app.request("/api/games");
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual(gameRecords);
});

test("GET /api/game", async () => {
  const gameId = 1;
  const res = await app.request(`/api/games/${gameId}`);
  expect(res.status).toBe(200);
  const gameResult = gameRecords.find((game) => game.id === gameId);
  expect(await res.json()).toEqual(gameResult);
});
