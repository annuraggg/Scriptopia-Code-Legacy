import Case from "@/types/Case";

const runJS = async (code: string, fnName: string, cases: Case[]) => {
  const jsCode = createJSFunction(code, fnName, cases);
  const result = await fetchOutput(jsCode, cases.length);

  return result;
};

const createJSFunction = (code: string, fnName: string, cases: Case[]) => {
  let jsCodeString: string = "";
  // Calculate Runtime
  jsCodeString += `const start = process.hrtime();\n\n`;
  jsCodeString += `${code}\n\n`;
  jsCodeString += `let passed = false;\n\n`;
  jsCodeString += `let failedCaseNumber = -1;\n\n`;
  jsCodeString += `const resultArr = [];\n`;
  jsCodeString += `const cases = ${JSON.stringify(cases)};\n\n`;
  jsCodeString += `for (let i = 0; i < cases.length; i++) {\n`;
  jsCodeString += `const input = cases[i].input;\n`;
  jsCodeString += `const output = cases[i].output;\n`;
  jsCodeString += `const result = ${fnName}(...input);\n`;
  jsCodeString += `if (result === output) {\n`;
  jsCodeString += `resultArr.push(result);\n passed = true;\n`;
  jsCodeString += `} else {\n`;
  jsCodeString += `resultArr.push(result);\n`;
  jsCodeString += `passed = false;\n`;
  jsCodeString += `failedCaseNumber = i;\n`;
  jsCodeString += `if (i >= 2) break;\n`;
  jsCodeString += `}\n`;
  jsCodeString += `}\n`;

  jsCodeString += `if (passed) {\n`;
  jsCodeString += `console.log(JSON.stringify({
    status: "PASSED", op: resultArr, failedCaseNumber
  }));\n`;
  jsCodeString += `} else {\n`;
  jsCodeString += `console.log(JSON.stringify({
    status: "FAILED", op: resultArr, failedCaseNumber
  }));\n`;
  jsCodeString += `}\n`;

  // Calculate Runtime
  jsCodeString += `const end = process.hrtime(start);\n`;
  jsCodeString += `console.log(end);\n\n`;

  // Get Memory Usage
  jsCodeString += `const used = process.memoryUsage();\n`;
  jsCodeString += `console.log(JSON.stringify(used));\n`;

  return jsCodeString;
};

const fetchOutput = async (code: string, casesLength: number) => {
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
    const splitOutput = data.output.split("\n");

    console.log(splitOutput);

    const output: { status: string; op: string[]; failedCaseNumber: number } =
      getOutput(splitOutput);
    const consoleOP: string[] = getConsole(splitOutput, casesLength);
    const runtime: number = getRuntime(splitOutput);
    const memoryUsage: number = getMemoryUsage(splitOutput);

    const dataObj: {
      timeStamp: string;
      status: string;
      output: string[];
      internalStatus: string;
      failedCaseNumber: number;
      error: string;
      language: string;
      info: string;
      consoleOP: string[];
      runtime: number;
      memoryUsage: number;
    } = {
      timeStamp: data.timeStamp,
      status: data.status,
      output: output.op ? output.op : [],
      internalStatus: output.status ? output.status : "FAILED",
      failedCaseNumber: output.failedCaseNumber ? output.failedCaseNumber : -1,
      error: data.error,
      language: data.language,
      info: data.info,
      consoleOP: consoleOP.length > 0 ? consoleOP : [],
      runtime: runtime ? runtime : 0,
      memoryUsage: memoryUsage ? memoryUsage : 0,
    };

    console.log(dataObj);

    return dataObj;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getConsole = (output: string[], totalCases: number): string[] => {
  return output.slice(0, output.length - 4);
};

const getOutput = (
  output: string
): { status: string; op: string[]; failedCaseNumber: number } => {
  try {
    let op: { status: string; op: string[]; failedCaseNumber: number } = {
      status: "",
      op: [],
      failedCaseNumber: 0
    };
    if (output && output.length > 3) {
      op = JSON.parse(output[output.length - 4]);
    }
    return op;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

const getRuntime = (output: []): number => {
  try {
    let runtime = [];
    let actualRuntime = 0;
    if (output && output.length > 3) {
      runtime = JSON.parse(output[output.length - 3]);
      actualRuntime = runtime[0] + runtime[1] / 1e9;
      actualRuntime = actualRuntime * 1000;
    }
    return actualRuntime;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getMemoryUsage = (output: []): number => {
  try {
    let memoryUsage: {
      rss?: number;
      heapTotal?: number;
      heapUsed?: number;
      external?: number;
    } = {};
    let actualMemoryUsage = 0;
    if (output && output.length > 3) {
      memoryUsage = JSON.parse(output[output.length - 2]);
      actualMemoryUsage = memoryUsage.rss! / (1024 * 1024);
    }
    return actualMemoryUsage;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default runJS;
