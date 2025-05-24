import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    user: process.env.DB_USER as string,
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PASS as string,
    port: Number(process.env.DB_PORT),
    ssl: false,
  },
});
