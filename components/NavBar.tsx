import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import LogoutButton from "./LogoutButton";

export default async function NavBar() {
  const session = await getSession();
  const user = session
    ? await prisma.user.findUnique({ where: { id: session.userId }, select: { name: true } })
    : null;

  return (
    <nav className="flex items-center justify-between border-b border-gray-800 px-8 py-3">
      <Link href="/problems" className="font-bold">CodePlatform</Link>
      {user ? (
        <div className="flex items-center gap-4 text-sm">
          <span>{user.name}</span>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex gap-4 text-sm">
          <Link href="/login" className="hover:underline">Log in</Link>
          <Link href="/register" className="hover:underline">Sign up</Link>
          <Link href="/leaderboard">Leaderboard</Link>
        </div>
      )}
    </nav>
  );
}