import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

import departmentsData from "../src/data/employees.json" with { type: "json" };
import { roles } from "../src/data/roles.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding Pixell River Financial database...");

  for (const departmentData of departmentsData) {
    const department = await prisma.department.upsert({
      where: { name: departmentData.name },
      update: {},
      create: { name: departmentData.name },
    });

    for (const employee of departmentData.employees) {
      const existing = await prisma.employee.findFirst({
        where: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          departmentId: department.id,
        },
      });

      if (!existing) {
        await prisma.employee.create({
          data: {
            firstName: employee.firstName,
            lastName: employee.lastName,
            departmentId: department.id,
          },
        });
      }
    }
  }

  for (const person of roles) {
    await prisma.role.upsert({
      where: { role: person.role },
      update: {
        firstName: person.firstName,
        lastName: person.lastName,
      },
      create: {
        firstName: person.firstName,
        lastName: person.lastName,
        role: person.role,
      },
    });
  }

  console.log("Database seeded successfully!");
  console.log("Departments:", await prisma.department.count());
  console.log("Employees:", await prisma.employee.count());
  console.log("Roles:", await prisma.role.count());
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
