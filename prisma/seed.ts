import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config"; // Ensures process.env.DATABASE_URL is populated

// 1. Establish a standard PostgreSQL connection pool using node-pg
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Instantiate the Prisma PostgreSQL driver adapter
const adapter = new PrismaPg(pool);

// 3. Pass the driver adapter to PrismaClient
export const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "Alice",
        email: "pop@mail.com",
      },
      {
        name: "Bob",
        email: "bob@mail.com",
      },
    ],
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end(); // Clean up the connection pool on success
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end(); // Clean up the connection pool on error
    process.exit(1);
  });