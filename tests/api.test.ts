import { expect, test, describe } from "vitest";
import { app } from "../src/app";

describe("Health check", () => {
  test("GET /health", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
  });
});
