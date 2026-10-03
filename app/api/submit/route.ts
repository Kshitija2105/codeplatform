import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
const JUDGE0_URL = process.env.JUDGE0_URL ?? "https://ce.judge0.com";

const LANGUAGE_IDS: Record<string, number> = {
  python: 109,
  javascript: 102,
  cpp: 105,
};

type Result = { verdict: string; passed: number; total: number; detail?: string };

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in to submit." }, { status: 401 });
  }
  const userId = session.userId;
  const { slug, language, code } = await req.json();
  const languageId = LANGUAGE_IDS[language];

  const problem = await prisma.problem.findUnique({
    where: { slug },
    include: { testCases: { orderBy: { id: "asc" } } },
  });

  if (!problem || problem.testCases.length === 0 || !languageId || typeof code !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const total = problem.testCases.length;

  async function finish(r: Result) {
    await prisma.submission.create({
      data: {
        problemId: problem!.id,
        userId,
        language,
        code,
        verdict: r.verdict,
        passed: r.passed,
        total: r.total,
      },
    });
    return NextResponse.json(r);
  }

  for (let i = 0; i < total; i++) {
    const tc = problem.testCases[i];
    try {
      const res = await fetch(`${JUDGE0_URL}/submissions?wait=true`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language_id: languageId,
          source_code: code,
          stdin: tc.input,
          cpu_time_limit: 2,
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: `Execution service returned ${res.status}` },
          { status: 502 }
        );
      }
      const data = await res.json();
      const statusId: number = data.status?.id ?? 0;

      if (statusId === 6) {
        return finish({ verdict: "Compile Error", detail: data.compile_output ?? "", passed: i, total });
      }
      if (statusId === 5) {
        return finish({ verdict: "Time Limit Exceeded", passed: i, total });
      }
      if (statusId >= 7) {
        return finish({ verdict: "Runtime Error", detail: data.stderr ?? "", passed: i, total });
      }

      const actual = (data.stdout ?? "").trim();
      if (actual !== tc.expected.trim()) {
        return finish({
          verdict: "Wrong Answer",
          detail: `Failed on test case ${i + 1}`,
          passed: i,
          total,
        });
      }
    } catch {
      return NextResponse.json(
        { error: "Could not reach the execution service" },
        { status: 502 }
      );
    }
  }

  return finish({ verdict: "Accepted", passed: total, total });
}