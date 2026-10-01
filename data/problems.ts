export type TestCase = { input: string; expected: string };

export type Problem = {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  starterCode: Record<string, string>;
  testCases: TestCase[];
};

export const problems: Problem[] = [
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers and a target, print the indices (0-based, smaller first, separated by a space) of the two numbers that add up to the target. Exactly one solution exists.\n\nInput:\nLine 1: n (array length)\nLine 2: n integers\nLine 3: target\n\nOutput: two indices separated by a space.\n\nExample:\n4\n2 7 11 15\n9\n→ 0 1",
    starterCode: {
      python:
        "n = int(input())\nnums = list(map(int, input().split()))\ntarget = int(input())\n\n# print the two indices separated by a space\n",
      javascript:
        "const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = parseInt(lines[0]);\nconst nums = lines[1].split(' ').map(Number);\nconst target = parseInt(lines[2]);\n\n// print the two indices separated by a space\n",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for (int &x : nums) cin >> x;\n    int target;\n    cin >> target;\n\n    // print the two indices separated by a space\n    return 0;\n}\n",
    },
    testCases: [
      { input: "4\n2 7 11 15\n9\n", expected: "0 1" },
      { input: "3\n3 2 4\n6\n", expected: "1 2" },
      { input: "2\n3 3\n6\n", expected: "0 1" },
    ],
  },
  {
    slug: "reverse-string",
    title: "Reverse a String",
    difficulty: "Easy",
    description:
      "Read one line containing a string and print it reversed.\n\nExample:\nhello\n→ olleh",
    starterCode: {
      python: "s = input()\n\n# print the reversed string\n",
      javascript:
        "const s = require('fs').readFileSync(0, 'utf8').split('\\n')[0];\n\n// print the reversed string\n",
      cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n\n    // print the reversed string\n    return 0;\n}\n",
    },
    testCases: [
      { input: "hello\n", expected: "olleh" },
      { input: "a\n", expected: "a" },
      { input: "racecar!\n", expected: "!racecar" },
    ],
  },
];