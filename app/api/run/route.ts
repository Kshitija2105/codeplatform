import { NextResponse } from "next/server";

const JUDGE0_URL = process.env.JUDGE0_URL ?? "https://ce.judge0.com";

// Replace these IDs with the ones from /languages
const LANGUAGE_IDS: Record<string, number> = {
    python: 109,      // Python 3.13.2
    javascript: 102,  // Node.js 22.08.0
    cpp: 105,         // C++ GCC 14.1.0
};

export async function POST(req: Request) {
  const { language, code, stdin } = await req.json();
  const languageId = LANGUAGE_IDS[language];

  if (!languageId || typeof code !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const res = await fetch(`${JUDGE0_URL}/submissions?wait=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
        stdin: stdin ?? "",
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: `Execution service returned ${res.status}: ${text}` },
        { status: 502 }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json({
      stdout: data.stdout ?? "",
      stderr: data.stderr ?? "",
      compileError: data.compile_output ?? "",
      status: data.status?.description ?? "",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the execution service" },
      { status: 502 }
    );
  }
}