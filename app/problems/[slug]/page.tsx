import { notFound } from "next/navigation";
import { problems } from "@/data/problems";
import CodeEditor from "@/components/CodeEditor";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = problems.find((p) => p.slug === slug);
  if (!problem) notFound();

  return (
    <main className="grid min-h-screen grid-cols-1 gap-6 p-8 lg:grid-cols-2">
      <section>
        <h1 className="mb-1 text-2xl font-bold">{problem.title}</h1>
        <p className="mb-4 text-sm text-gray-400">{problem.difficulty}</p>
        <p className="whitespace-pre-wrap leading-relaxed">{problem.description}</p>
      </section>
      <section>
      <CodeEditor slug={problem.slug} starterCode={problem.starterCode} />
      </section>
    </main>
  );
}