import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { todo } from "./schema";
import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  await db.delete(todo).execute();
  await db.insert(todo).values([
    {
      id: 1,
      text: "first todo",
      done: false,
    },
    {
      id: 2,
      text: "second todo",
      done: true,
    },
  ]);
}

async function main() {
  try {
    await seed();
    console.log("Seeding completed");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

main();
