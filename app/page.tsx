import Link from "next/link";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-8 py-24 text-center">
      <h1 className="text-5xl font-bold">CodePlatform</h1>
      <p className="text-gray-400">
        Solve coding problems in C++ or Python, get instant verdicts,
        and climb the leaderboard.
      </p>
      <div className="flex gap-4">
        <Link href="/problems" className="rounded bg-green-600 px-5 py-2 font-medium hover:bg-green-500">
          Browse problems
        </Link>
        {!session && (
          <>
            <Link href="/login" className="rounded border border-gray-600 px-5 py-2 hover:bg-gray-800">
              Log in
            </Link>
            <Link href="/register" className="rounded border border-gray-600 px-5 py-2 hover:bg-gray-800">
              Sign up
            </Link>
          </>
        )}
        <Link href="/leaderboard" className="rounded border border-gray-600 px-5 py-2 hover:bg-gray-800">
          Leaderboard
        </Link>
      </div>
    </main>
  );
}