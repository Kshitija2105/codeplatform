import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { problems } from "../data/problems";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const p of problems) {
    const data = {
      title: p.title,
      difficulty: p.difficulty,
      description: p.description,
      starterCode: JSON.stringify(p.starterCode),
    };

    const problem = await prisma.problem.upsert({
      where: { slug: p.slug },
      update: data,
      create: { slug: p.slug, ...data },
    });

    await prisma.testCase.deleteMany({ where: { problemId: problem.id } });
    await prisma.testCase.createMany({
      data: p.testCases.map((tc, i) => ({
        problemId: problem.id,
        input: tc.input,
        expected: tc.expected,
        hidden: i !== 0, // first case is the visible sample
      })),
    });
  }
  console.log(`Seeded ${problems.length} problems`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());