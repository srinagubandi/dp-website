import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required to run database migrations");

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/generated",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL },
});
