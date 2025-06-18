import { serve } from "@hono/node-server";
import { app } from "./src/app";

serve(app, (info) => {
  console.log(`Server listening at http://localhost:${info.port}`);
});
