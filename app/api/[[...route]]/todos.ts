import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { eq } from "drizzle-orm";
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
  .delete("/", async (c) => {
    const { id } = c.req.query();
    if (!id) return;

    await db.delete(todo).where(eq(todo.id, Number(id)));
  })
  .put("/done", async (c) => {
    const { id } = c.req.query();
    if (!id) return;

    await db
      .update(todo)
      .set({
        done: !todo.done,
      })
      .where(eq(todo.id, Number(id)));
  })
  .put("/", async (c) => {
    const { id, text } = c.req.query();
    if (!(id && text)) return;

    await db
      .update(todo)
      .set({
        text: text,
      })
      .where(eq(todo.id, Number(id)));
  });

export default app;
