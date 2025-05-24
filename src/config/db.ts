import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schema/schema";

config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });

pool.on("connect", () => {
  // console.log("✅ Connected to the PostgreSQL database.");
});

export default pool;
