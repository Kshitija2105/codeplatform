import { NextResponse } from "next/server";
import { problems } from "@/data/problems";

const JUDGE0_URL = process.env.JUDGE0_URL ?? "https://ce.judge0.com";

const LANGUAGE_IDS: Record<string, number> = {
  python: 109,
  javascript: 102,
  cpp: 105,
};

export async function POST(req: Request) {
  const { slug, language, code } = await req.json();
  const problem = problems.find((p) => p.slug === slug);
  const languageId = LANGUAGE_IDS[language];

  if (!problem || !languageId || typeof code !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const total = problem.testCases.length;

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
        return NextResponse.json({
          verdict: "Compile Error",
          detail: data.compile_output ?? "",
          passed: i,
          total,
        });
      }
      if (statusId === 5) {
        return NextResponse.json({ verdict: "Time Limit Exceeded", passed: i, total });
      }
      if (statusId >= 7) {
        return NextResponse.json({
          verdict: "Runtime Error",
          detail: data.stderr ?? data.message ?? "",
          passed: i,
          total,
        });
      }

      const actual = (data.stdout ?? "").trim();
      if (actual !== tc.expected.trim()) {
        return NextResponse.json({
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

  return NextResponse.json({ verdict: "Accepted", passed: total, total });
}