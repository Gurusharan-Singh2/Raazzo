import "dotenv/config";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryString=process.env.DATABASE_URL as string;

export const connection = postgres(queryString);
export const db = drizzle(connection);

export async function testConnection() {
  const result = await db.execute("select 1");
  console.log("DB connection OK:", result);
}