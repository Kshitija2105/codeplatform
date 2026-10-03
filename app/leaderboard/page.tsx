import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const accepted = await prisma.submission.findMany({
    where: { verdict: "Accepted", userId: { not: null } },
    select: { userId: true, problemId: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  // first accepted time for each (user, problem) pair
  const solvedBy = new Map<number, Map<number, Date>>();
  for (const s of accepted) {
    if (s.userId === null) continue;
    const perUser = solvedBy.get(s.userId) ?? new Map<number, Date>();
    if (!perUser.has(s.problemId)) perUser.set(s.problemId, s.createdAt);
    solvedBy.set(s.userId, perUser);
  }

  const rows = [...solvedBy.entries()].map(([userId, solved]) => ({
    userId,
    solved: solved.size,
    lastSolveAt: Math.max(...[...solved.values()].map((d) => d.getTime())),
  }));
  rows.sort((a, b) => b.solved - a.solved || a.lastSolveAt - b.lastSolveAt);

  const users = await prisma.user.findMany({
    where: { id: { in: rows.map((r) => r.userId) } },
    select: { id: true, name: true },
  });
  const nameById = new Map(users.map((u) => [u.id, u.name]));

  return (
    <main className="mx-auto w-full max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Leaderboard</h1>
      {rows.length === 0 ? (
        <p className="text-gray-400">No accepted solutions yet.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="py-2 pr-6">#</th>
              <th className="py-2 pr-6">User</th>
              <th className="py-2 pr-6">Solved</th>
              <th className="py-2">Last solved</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.userId} className="border-b border-gray-800">
                <td className="py-2 pr-6">{i + 1}</td>
                <td className="py-2 pr-6">{nameById.get(r.userId) ?? "Unknown"}</td>
                <td className="py-2 pr-6">{r.solved}</td>
                <td className="py-2">{new Date(r.lastSolveAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}