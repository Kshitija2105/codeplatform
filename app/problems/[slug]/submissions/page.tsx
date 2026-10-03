import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getSession();

  const problem = await prisma.problem.findUnique({
    where: { slug },
    include: {
      submissions: {
        where: { userId: session?.userId ?? -1 },
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });
  if (!problem) notFound();

  return (
    <main className="mx-auto max-w-4xl p-8">
      <Link href={`/problems/${slug}`} className="text-sm text-gray-400 hover:underline">
        ← Back to {problem.title}
      </Link>
      <h1 className="mb-6 mt-2 text-2xl font-bold">Submissions: {problem.title}</h1>

      {!session ? (
        <p className="text-gray-400">
          Please <Link href="/login" className="text-blue-400 hover:underline">log in</Link> to see your submissions.
        </p>
      ) : problem.submissions.length === 0 ? (
        <p className="text-gray-400">No submissions yet.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-700 text-gray-400">
            <tr>
              <th className="py-2">When</th>
              <th>Language</th>
              <th>Verdict</th>
              <th>Tests passed</th>
            </tr>
          </thead>
          <tbody>
            {problem.submissions.map((s) => (
              <tr key={s.id} className="border-b border-gray-800">
                <td className="py-2">{s.createdAt.toLocaleString()}</td>
                <td>{s.language}</td>
                <td className={s.verdict === "Accepted" ? "text-green-400" : "text-red-400"}>
                  {s.verdict}
                </td>
                <td>
                  {s.passed}/{s.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}