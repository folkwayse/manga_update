import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import { cors } from "hono/cors";

//import router
import kiryu from "./router/kiryu";
import { checkStatus } from "./main";

dotenv.config();

const app = new Hono();
app.use("*", cors());
app.get("/", async (c) => {
  const result = await checkStatus();
  return c.json(result);
});

app.route("/kiryuu", kiryu);

const port = parseInt(process.env.PORT || "3000", 10) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
