import { expect, test } from "vitest";
import { app } from "../../src/app";
import { getTestAuthCookie } from "../helpers";
import { ERRORS } from "../../src/errors";

test("POST /api/signin", async () => {
  const requestBody = {
    email: "user@mail.com",
    password: "12345678",
  };
  const res = await app.request("/api/signin", {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
  expect(res.status).toBe(200);
  expect(await res.json()).toBe("OK");
});

test("Logged-in user cannot request other users data", async () => {
  const userId = 2;
  const token = getTestAuthCookie({ id: 1, email: "user@mail.com" });

  const res = await app.request(`/api/wishlist/${userId}`, {
    method: "GET",
    headers: { Cookie: token },
  });

  expect(res.status).toBe(401);
  expect(await res.json()).toEqual({
    error: {
      code: "UNAUTHORIZED",
      message: "Not authorized",
    },
  });
});
