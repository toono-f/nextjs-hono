import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { Hono } from "hono";

const app = new Hono()
  .get("/", async (c) => {
    const todos = await db.select().from(todo);
    return c.json(todos);
  })
  .post("/", async (c) => {
    const { id, text } = c.req.query();
    if (!(id && text)) return;

    await db.insert(todo).values({
      id: Number(id),
      text: text,
    });
  })
  // TODO: こちらもtodoActionから移し替える
  .delete("/", async (c) => {})
  .put("/", async (c) => {});

export default app;
