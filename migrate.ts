import dotenv from "dotenv";
dotenv.config({ path: ".env" });
console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);
import { connection, db } from "@/lib/db/db"
import { migrate } from "drizzle-orm/postgres-js/migrator"

(async()=>{
  await migrate(db,{migrationsFolder:'./drizzle'})
  await connection.end()

})()