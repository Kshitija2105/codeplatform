import Link from "next/link";
import { problems } from "@/data/problems";

export default function ProblemsPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Problems</h1>
      <ul className="divide-y divide-gray-700 rounded border border-gray-700">
        {problems.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/problems/${p.slug}`}
              className="flex justify-between p-4 hover:bg-gray-800"
            >
              <span>{p.title}</span>
              <span className="text-sm text-gray-400">{p.difficulty}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}