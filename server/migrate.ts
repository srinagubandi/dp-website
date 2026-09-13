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

main().catch(error => {
  const detail = error as Error & {
    cause?: unknown;
    code?: string;
    detail?: string;
  };
  console.error("[migration]", {
    message: detail instanceof Error ? detail.message : "Unknown error",
    code: detail.code,
    detail: detail.detail,
    cause: detail.cause instanceof Error ? detail.cause.message : undefined,
  });
  process.exit(1);
});
