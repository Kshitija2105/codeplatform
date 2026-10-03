# CodePlatform

A LeetCode-style coding practice platform. Solve problems in C++, Python or JavaScript, get instant verdicts, and climb the leaderboard.

## Features

- 10 problems with hidden test cases
- In-browser code editor (Monaco) with C++, Python and JavaScript starters
- **Run** with custom input, **Submit** to be judged against all test cases
- User accounts (register, login, logout) with hashed passwords and session cookies
- Per-problem submission history
- Leaderboard ranked by problems solved

## Tech stack

Next.js (App Router), TypeScript, Tailwind CSS, Prisma 7 with SQLite, Judge0 for sandboxed code execution, bcrypt for password hashing.

## Setup

```bash
npm install
cp .env.example .env     # then set SESSION_SECRET (openssl rand -base64 32)
npx prisma migrate dev
npx prisma generate
npx tsx prisma/seed.ts
npx tsx prisma/add-problems.ts
npm run dev
```

Open http://localhost:3000.

Code execution uses the public Judge0 CE instance by default. Set `JUDGE0_URL` in `.env` to use your own.

## Project structure

```
app/            pages and API routes (run, submit, auth)
components/     CodeEditor, NavBar, AuthForm
lib/            Prisma client and session helpers
prisma/         schema, migrations, seed scripts
```

## Future work

Self-hosted Judge0, deployment with Postgres, per-test-case results, difficulty filters.