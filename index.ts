import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { db } from "./src/db/connection";
import { games } from "./src/db/schema";
import { seed } from "./seed";

const app = new Hono();

// CORS Middleware
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) => {
  // c.html funkce vytvoří HTML odpověď
  return c.html("<h1>Hello, World!</h1>");
});

app.get("/say", (c) => {
  // c.text funkce vytvoří text odpověď
  return c.text("Hello, World");
});

app.get("/json", (c) => {
  // c.json funkce vytvoří JSON odpověď
  return c.json({ firstName: "Franta", lastName: "Sádlo" });
});

serve(app, (info) => {
  console.log(`Server listening at http://localhost:${info.port}`);
});
