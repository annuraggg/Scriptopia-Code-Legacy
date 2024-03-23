import Case from "@/Interfaces/Case.js";
import Problem from "@/Interfaces/Problem";

const runJS = async (
  code: string,
  fnName: string,
  cases: Case[],
  problem: Problem
) => {
  const jsCode = createJSFunction(code, fnName, cases, problem);
  const result = await fetchOutput(jsCode, cases);

  return result;
};

const createJSFunction = (
  code: string,
  fnName: string,
  cases: Case[],
  problem: Problem
) => {
  let jsCodeString: string = ``;
  jsCodeString += `
  const vanillaLog = console.log;

  console.log = function (...args) {
  consoleOP.push(args.join(" "));
  };
`;
  jsCodeString += code;
  jsCodeString += `
  const cases = ${JSON.stringify(cases)};
  const argTypes = ${JSON.stringify(problem.starterVarArgs)};
  const returnType = "${problem.functionReturn}";

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
  
    let result = ${fnName}(...args);
  
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
    executionTime: end[1] / 1000000,
    memoryUsed: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
    passed: passed,
    consoleOP: consoleOP,
    failedCase: failedCase,
  };
  
  vanillaLog(JSON.stringify(outputObj));
  `;

  return jsCodeString;
};

const fetchOutput = async (code: string, cases: Case[]) => {
  try {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "js",
        input: "",
        code: code,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch output");
    }

    const data = await response.json();
    const output = JSON.parse(data.output);

    const dataobj: {
      timeStamp: string;
      status: string;
      output: string[];
      internalStatus: string;
      failedCaseNumber: number;
      failedCase: Case;
      error: string;
      language: string;
      info: string;
      consoleOP: string[];
      runtime: number;
      memoryUsage: number;
    } = {
      timeStamp: data.timeStamp,
      status: data.status,
      output: output.output,
      internalStatus: output.passed ? "PASSED" : "FAILED",
      failedCaseNumber: output.failedCase,
      failedCase: output.failedCase === -1 ? {} as Case : cases[output.failedCase],
      error: data.error,
      language: data.language,
      info: data.info,
      consoleOP: output.consoleOP,
      runtime: parseFloat(output.executionTime),
      memoryUsage: parseFloat(output.memoryUsed),
    };

    return dataobj;
  } catch (error) {
    console.error(error);
  }
};

export default runJS;
