import { Hono } from "hono";
import { handle } from "hono/vercel";

import todos from "./todos";

export const runtime = "edge";

const app = new Hono().basePath("/api");
const route = app.route("/todos", todos);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
