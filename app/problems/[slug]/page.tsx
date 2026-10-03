import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CodeEditor from "@/components/CodeEditor";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = await prisma.problem.findUnique({ where: { slug } });
  if (!problem) notFound();

  const starterCode: Record<string, string> = JSON.parse(problem.starterCode);

  return (
    <main className="grid min-h-screen grid-cols-1 gap-6 p-8 lg:grid-cols-2">
      <section>
        <h1 className="mb-1 text-2xl font-bold">{problem.title}</h1>
        <p className="mb-4 text-sm text-gray-400">{problem.difficulty}</p>
        <p className="whitespace-pre-wrap leading-relaxed">{problem.description}</p>
        <Link
          href={`/problems/${slug}/submissions`}
          className="mt-6 inline-block text-sm text-blue-400 hover:underline"
        >
        View submissions
      </Link>
      </section>
      <section>
        <CodeEditor slug={problem.slug} starterCode={starterCode} />
      </section>
    </main>
  );
}