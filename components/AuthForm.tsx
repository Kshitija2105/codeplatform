"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error ?? "Something went wrong.");
      router.push("/problems");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  const input = "w-full rounded border border-gray-600 bg-gray-900 px-3 py-2";

  return (
    <main className="mx-auto max-w-sm p-8">
      <h1 className="mb-6 text-2xl font-bold">
        {mode === "login" ? "Log in" : "Create account"}
      </h1>
      <div className="flex flex-col gap-3">
        {mode === "register" && (
          <input className={input} placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <input className={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          className={input}
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button onClick={submit} disabled={busy} className="rounded bg-green-600 px-4 py-2 hover:bg-green-500 disabled:opacity-50">
          {mode === "login" ? "Log in" : "Sign up"}
        </button>
        <p className="text-sm text-gray-400">
          {mode === "login" ? (
            <>No account? <Link href="/register" className="text-blue-400 hover:underline">Sign up</Link></>
          ) : (
            <>Have an account? <Link href="/login" className="text-blue-400 hover:underline">Log in</Link></>
          )}
        </p>
      </div>
    </main>
  );
}