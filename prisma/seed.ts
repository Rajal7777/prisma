import { Pool } from "pg";
import { prisma } from "../lib/prisma";


async function seed() {
  await prisma.user.createMany({
    data: [
  
    ],
    // Skip records that would violate unique constraints (e.g. duplicate emails)
    skipDuplicates: true,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
   process.exit(1);
  });