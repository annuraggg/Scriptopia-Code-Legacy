/*
 * @param {array nums, int target}
 * @returns {undefined}
 */

const vanillaLog = console.log;

console.log = function (...args) {
  consoleOP.push(args.join(" "));
};

function twoSum(nums, target) {
  console.log("ji");
  const numToIndex = new Map(); // Create a Map to store numbers and their indices

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // Check if the complement exists in the Map
    if (numToIndex.has(complement)) {
      return [numToIndex.get(complement), i];
    }

    // Store the current number and its index in the Map
    numToIndex.set(nums[i], i);
  }

  throw new Error("No solution found");
}

const cases = [
  {
    name: "Case 1",
    difficulty: "easy",
    score: 20,
    input: ["[2,7,11,15]", "9"],
    output: "[0,1]",
    isSample: true,
    _id: "65feed75e1cdfba92e21406a",
  },
  {
    name: "Case 2",
    difficulty: "easy",
    score: 20,
    input: ["[3,2,4]", "6"],
    output: "[1,2]",
    isSample: true,
    _id: "65feed75e1cdfba92e21406b",
  },
  {
    name: "Case 3",
    difficulty: "easy",
    score: 20,
    input: ["[3,3]", "6"],
    output: "[0,1]",
    isSample: true,
    _id: "65feed75e1cdfba92e21406c",
  },
  
];

const argTypes = [
  { key: "nums", type: "array" },
  { key: "target", type: "int" },
];

const returnType = "string";

function parseArgument(arg, type) {
  switch (type) {
    case "array":
      return JSON.parse(arg);
    case "number":
      return parseFloat(arg);
    case "string":
      return arg;
    case "bool":
      return arg === "true";
    default:
      return arg;
  }
}

let passed = false;
let failedCase = -1;
let consoleOP = [];
const output = [];
const start = process.hrtime();

for (let i = 0; i < cases.length; i++) {
  const args = cases[i].input.map((value, index) => {
    return parseArgument(value, argTypes[index].type);
  });

  let result = twoSum(...args);

  if (typeof result === "object" || typeof result === "array") {
    result = JSON.stringify(result);
  }

  if (result == cases[i].output) {
    output.push(result);
    passed = true;
  } else {
    passed = false;
    failedCase = i;
    break;
  }
}

const end = process.hrtime(start);

const outputObj = {
  output,
  executionTime: end[1] / 1000000 + "ms",
  memoryUsed: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB",
  passed: passed,
  consoleOP: consoleOP,
  failedCase: failedCase,
};

vanillaLog(outputObj);
