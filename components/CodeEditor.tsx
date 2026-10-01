"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeEditor({
  slug,
  starterCode,
}: {
  slug: string;
  starterCode: Record<string, string>;
}) {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(starterCode["python"]);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("Run your code to see output here.");
  const [busy, setBusy] = useState(false);

  function changeLanguage(lang: string) {
    setLanguage(lang);
    setCode(starterCode[lang]);
  }

  async function runCode() {
    setBusy(true);
    setOutput("Running...");
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, stdin }),
      });
      const data = await res.json();
      if (data.error) return setOutput(data.error);
      setOutput(data.compileError || data.stderr || data.stdout || "(no output)");
    } catch {
      setOutput("Something went wrong running your code.");
    } finally {
      setBusy(false);
    }
  }

  async function submitCode() {
    setBusy(true);
    setOutput("Judging...");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, language, code }),
      });
      const data = await res.json();
      if (data.error) return setOutput(data.error);
      setOutput(
        `${data.verdict}\nPassed ${data.passed}/${data.total} test cases` +
          (data.detail ? `\n\n${data.detail}` : "")
      );
    } catch {
      setOutput("Something went wrong judging your code.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="rounded border border-gray-600 bg-gray-900 px-3 py-1"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={runCode}
            disabled={busy}
            className="rounded bg-gray-700 px-4 py-1 hover:bg-gray-600 disabled:opacity-50"
          >
            Run
          </button>
          <button
            onClick={submitCode}
            disabled={busy}
            className="rounded bg-green-600 px-4 py-1 hover:bg-green-500 disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>

      <Editor
        height="380px"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(v) => setCode(v ?? "")}
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />

      <textarea
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
        placeholder="Custom input for Run (stdin)"
        className="h-20 rounded border border-gray-600 bg-gray-900 p-2 font-mono text-sm"
      />

      <pre className="min-h-24 whitespace-pre-wrap rounded bg-gray-900 p-3 text-sm">
        {output}
      </pre>
    </div>
  );
}