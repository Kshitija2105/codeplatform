import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

type P = {
  slug: string;
  title: string;
  difficulty: string;
  description: string;
  cpp: string;
  python: string;
  javascript: string;
  tests: [string, string][];
};

const problems: P[] = [
  {
    slug: "palindrome-check",
    title: "Palindrome Check",
    difficulty: "Easy",
    description: `Given a single word (no spaces), print true if it reads the same forwards and backwards, otherwise print false.

Input:
Line 1: a lowercase word

Output: true or false

Example:
racecar
→ true`,
    cpp: `#include <iostream>
#include <string>
using namespace std;

bool solve(string s) {
    // write your code here
    return false;
}

int main() {
    string s;
    cin >> s;
    cout << (solve(s) ? "true" : "false") << endl;
    return 0;
}`,
    python: `s = input().strip()

# print true or false
`,
    javascript: `const s = require("fs").readFileSync(0, "utf8").trim();

// print true or false
`,
    tests: [
      ["racecar", "true"],
      ["hello", "false"],
      ["a", "true"],
      ["abba", "true"],
      ["abca", "false"],
    ],
  },
  {
    slug: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "Easy",
    description: `For every number from 1 to n, print on its own line:
- "FizzBuzz" if divisible by 3 and 5
- "Fizz" if divisible by 3
- "Buzz" if divisible by 5
- otherwise the number itself

Input:
Line 1: n

Example:
5
→ 1
2
Fizz
4
Buzz`,
    cpp: `#include <iostream>
using namespace std;

void solve(int n) {
    // write your code here
}

int main() {
    int n;
    cin >> n;
    solve(n);
    return 0;
}`,
    python: `n = int(input())

# print one line for each number from 1 to n
`,
    javascript: `const n = parseInt(require("fs").readFileSync(0, "utf8").trim());

// print one line for each number from 1 to n
`,
    tests: [
      ["5", "1\n2\nFizz\n4\nBuzz"],
      ["3", "1\n2\nFizz"],
      ["15", "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz"],
    ],
  },
  {
    slug: "max-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: `Given an array of integers, find the contiguous subarray (at least one element) with the largest sum and print that sum.

Input:
Line 1: n (array length)
Line 2: n integers

Output: the maximum subarray sum

Example:
9
-2 1 -3 4 -1 2 1 -5 4
→ 6`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int solve(vector<int>& nums) {
    // write your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << solve(nums) << endl;
    return 0;
}`,
    python: `n = int(input())
nums = list(map(int, input().split()))

# print the maximum subarray sum
`,
    javascript: `const lines = require("fs").readFileSync(0, "utf8").trim().split("\\n");
const n = parseInt(lines[0]);
const nums = lines[1].split(" ").map(Number);

// print the maximum subarray sum
`,
    tests: [
      ["9\n-2 1 -3 4 -1 2 1 -5 4", "6"],
      ["1\n1", "1"],
      ["5\n-3 -2 -5 -1 -4", "-1"],
      ["5\n5 4 -1 7 8", "23"],
    ],
  },
  {
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: `Given a string containing only the characters ( ) [ ] { }, print true if the brackets are closed in the correct order, otherwise false.

Input:
Line 1: the string (no spaces)

Output: true or false

Example:
([{}])
→ true`,
    cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool solve(string s) {
    // write your code here
    return false;
}

int main() {
    string s;
    cin >> s;
    cout << (solve(s) ? "true" : "false") << endl;
    return 0;
}`,
    python: `s = input().strip()

# print true or false
`,
    javascript: `const s = require("fs").readFileSync(0, "utf8").trim();

// print true or false
`,
    tests: [
      ["()[]{}", "true"],
      ["(]", "false"],
      ["([{}])", "true"],
      ["((", "false"],
      ["{[}]", "false"],
    ],
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    description: `Given a sorted array of distinct integers and a target, print the index (0-based) of the target, or -1 if it is not present. Aim for O(log n).

Input:
Line 1: n
Line 2: n sorted integers
Line 3: target

Example:
6
-1 0 3 5 9 12
9
→ 4`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int solve(vector<int>& nums, int target) {
    // write your code here
    return -1;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target;
    cin >> target;
    cout << solve(nums, target) << endl;
    return 0;
}`,
    python: `n = int(input())
nums = list(map(int, input().split()))
target = int(input())

# print the index of target, or -1
`,
    javascript: `const lines = require("fs").readFileSync(0, "utf8").trim().split("\\n");
const n = parseInt(lines[0]);
const nums = lines[1].split(" ").map(Number);
const target = parseInt(lines[2]);

// print the index of target, or -1
`,
    tests: [
      ["6\n-1 0 3 5 9 12\n9", "4"],
      ["6\n-1 0 3 5 9 12\n2", "-1"],
      ["1\n5\n5", "0"],
      ["5\n1 3 5 7 9\n1", "0"],
    ],
  },
  {
    slug: "merge-sorted-arrays",
    title: "Merge Sorted Arrays",
    difficulty: "Easy",
    description: `Given two sorted arrays, print one sorted array containing all elements of both, separated by spaces.

Input:
Line 1: n
Line 2: n integers (sorted)
Line 3: m
Line 4: m integers (sorted)

Example:
3
1 3 5
3
2 4 6
→ 1 2 3 4 5 6`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> solve(vector<int>& a, vector<int>& b) {
    // write your code here
    return {};
}

int main() {
    int n, m;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cin >> m;
    vector<int> b(m);
    for (int i = 0; i < m; i++) cin >> b[i];
    vector<int> res = solve(a, b);
    for (int i = 0; i < (int)res.size(); i++) {
        if (i) cout << " ";
        cout << res[i];
    }
    cout << endl;
    return 0;
}`,
    python: `n = int(input())
a = list(map(int, input().split()))
m = int(input())
b = list(map(int, input().split()))

# print the merged array, separated by spaces
`,
    javascript: `const lines = require("fs").readFileSync(0, "utf8").trim().split("\\n");
const n = parseInt(lines[0]);
const a = lines[1].split(" ").map(Number);
const m = parseInt(lines[2]);
const b = lines[3].split(" ").map(Number);

// print the merged array, separated by spaces
`,
    tests: [
      ["3\n1 3 5\n3\n2 4 6", "1 2 3 4 5 6"],
      ["2\n1 2\n3\n1 1 3", "1 1 1 2 3"],
      ["1\n5\n1\n1", "1 5"],
    ],
  },
  {
    slug: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    description: `You are given n distinct numbers taken from the range 0 to n. Exactly one number from that range is missing. Print it.

Input:
Line 1: n
Line 2: n integers

Example:
3
3 0 1
→ 2`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int solve(vector<int>& nums) {
    // write your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << solve(nums) << endl;
    return 0;
}`,
    python: `n = int(input())
nums = list(map(int, input().split()))

# print the missing number
`,
    javascript: `const lines = require("fs").readFileSync(0, "utf8").trim().split("\\n");
const n = parseInt(lines[0]);
const nums = lines[1].split(" ").map(Number);

// print the missing number
`,
    tests: [
      ["3\n3 0 1", "2"],
      ["2\n0 1", "2"],
      ["9\n9 6 4 2 3 5 7 0 1", "8"],
      ["1\n0", "1"],
    ],
  },
  {
    slug: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    description: `Given daily stock prices, you may buy on one day and sell on a later day. Print the maximum profit, or 0 if no profit is possible.

Input:
Line 1: n
Line 2: n prices

Example:
6
7 1 5 3 6 4
→ 5`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int solve(vector<int>& prices) {
    // write your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> prices(n);
    for (int i = 0; i < n; i++) cin >> prices[i];
    cout << solve(prices) << endl;
    return 0;
}`,
    python: `n = int(input())
prices = list(map(int, input().split()))

# print the maximum profit
`,
    javascript: `const lines = require("fs").readFileSync(0, "utf8").trim().split("\\n");
const n = parseInt(lines[0]);
const prices = lines[1].split(" ").map(Number);

// print the maximum profit
`,
    tests: [
      ["6\n7 1 5 3 6 4", "5"],
      ["5\n7 6 4 3 1", "0"],
      ["2\n1 2", "1"],
      ["4\n2 4 1 7", "6"],
    ],
  },
];

async function main() {
  for (const p of problems) {
    // The editor reads starterCode[language], so all three keys are required.
    const starterCode = JSON.stringify({
      cpp: p.cpp,
      python: p.python,
      javascript: p.javascript,
    });

    const problem = await prisma.problem.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        difficulty: p.difficulty,
        description: p.description,
        starterCode,
      },
      create: {
        slug: p.slug,
        title: p.title,
        difficulty: p.difficulty,
        description: p.description,
        starterCode,
      },
    });

    await prisma.testCase.deleteMany({ where: { problemId: problem.id } });
    await prisma.testCase.createMany({
      data: p.tests.map(([input, expected], i) => ({
        problemId: problem.id,
        input,
        expected,
        hidden: i > 0,
      })),
    });
    console.log(`✓ ${p.title} (${p.tests.length} tests)`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());