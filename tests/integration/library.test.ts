import { expect, test } from "vitest";
import { app } from "../../src/app";
import { getTestAuthCookie } from "../helpers";

test("GET /api/library/:userId", async () => {
  const userId = 1;
  const token = getTestAuthCookie({ id: 1, email: "user@mail.com" });
  const response = [
    {
      id: 1,
      title: "Minecraft",
      description:
        "A sandbox game with limitless building possibilities and world exploration made of blocks",
      image:
        "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8fu7.jpg",
      status: "planned",
    },
    {
      id: 2,
      title: "The Witcher 3: Wild Hunt",
      description:
        "An action RPG set in an open fantasy world where you play as the witcher Geralt",
      image:
        "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1wyy.jpg",
      status: "playing",
    },
    {
      id: 3,
      title: "Cyberpunk 2077",
      description:
        "A story-driven open-world RPG set in the futuristic Night City",
      image:
        "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7497.jpg",
      status: "completed",
    },
  ];

  const res = await app.request(`/api/library/${userId}`, {
    method: "GET",
    headers: { Cookie: token },
  });
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual(response);
});
