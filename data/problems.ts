export type Problem = {
    slug: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description: string;
    starterCode: Record<string, string>;
  };
  
  export const problems: Problem[] = [
    {
      slug: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      description:
        "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. Each input has exactly one solution.",
      starterCode: {
        python: "def two_sum(nums, target):\n    # write your code here\n    pass\n",
        javascript: "function twoSum(nums, target) {\n  // write your code here\n}\n",
        cpp: "#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // write your code here\n}\n",
      },
    },
    {
      slug: "reverse-string",
      title: "Reverse a String",
      difficulty: "Easy",
      description: "Write a function that reverses a string and returns the result.",
      starterCode: {
        python: "def reverse_string(s):\n    # write your code here\n    pass\n",
        javascript: "function reverseString(s) {\n  // write your code here\n}\n",
        cpp: "#include <string>\nusing namespace std;\n\nstring reverseString(string s) {\n    // write your code here\n}\n",
      },
    },
  ];