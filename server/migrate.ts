import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { closeDb, getDb } from "./db";

async function main() {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL is required for migration.");
  await migrate(db, { migrationsFolder: "./drizzle/postgresql" });
  await closeDb();
  console.log("PostgreSQL migrations completed.");
}

main().catch(error => { console.error("[migration]", error instanceof Error ? error.message : "Unknown error"); process.exit(1); });
