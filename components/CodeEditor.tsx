"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeEditor({
  starterCode,
}: {
  starterCode: Record<string, string>;
}) {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(starterCode["python"]);
  const [output, setOutput] = useState("Run your code to see output here.");

  function changeLanguage(lang: string) {
    setLanguage(lang);
    setCode(starterCode[lang]);
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
            onClick={() => setOutput("(Execution not connected yet)")}
            className="rounded bg-gray-700 px-4 py-1 hover:bg-gray-600"
          >
            Run
          </button>
          <button
            onClick={() => setOutput("(Judging not connected yet)")}
            className="rounded bg-green-600 px-4 py-1 hover:bg-green-500"
          >
            Submit
          </button>
        </div>
      </div>

      <Editor
        height="420px"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(v) => setCode(v ?? "")}
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />

      <pre className="min-h-24 rounded bg-gray-900 p-3 text-sm">{output}</pre>
    </div>
  );
}