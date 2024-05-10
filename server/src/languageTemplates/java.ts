import logger from "@/config/logger.js";
import Case from "@/Interfaces/Case.js";
import Problem from "@/Interfaces/Problem.js";

const runJava = async (
  code: string,
  fnName: string,
  cases: Case[],
  problem: Problem
) => {
  const javaCode: string = createJavaFunction(code, fnName, cases, problem);
  const result = await fetchOutput(javaCode, cases);

  /*
  console.log("RESULT FROM COMPILER")
  console.log(result);*/
  return result;
};

const createJavaFunction = (
  code: string,
  fnName: string,
  cases: Case[],
  problem: Problem
): string => {
  const onlyCaseInputs = cases.map((c) => c.input);
  let javaCodeString: string = ``;

  javaCodeString += "import java.util.*;\n\n";
  javaCodeString += "public class Main {\n";
  javaCodeString +=
    "    private static final PrintStream vanillaLog = System.out;\n\n";
  javaCodeString += "    public static void main(String[] args) {\n";
  javaCodeString += "        List<String> consoleOP = new ArrayList<>();\n";
  javaCodeString +=
    "        System.setOut(new PrintStream(new OutputStream() {\n";
  javaCodeString += "            @Override\n";
  javaCodeString += "            public void write(int b) {\n";
  javaCodeString += "                consoleOP.add(String.valueOf((char) b));\n";
  javaCodeString += "            }\n";
  javaCodeString += "        }));\n\n";
  javaCodeString += code + "\n\n"; // Add your code here
  javaCodeString += `        List<Case> cases = new JSONArray(Arrays.asList(${cases})).toString(); \n`;
  javaCodeString += `        List<String> argTypes = new JSONArray(${problem.starterVarArgs}).toString(); \n`;
  javaCodeString += `        String returnType = ${problem.functionReturn};\n\n`;
  javaCodeString += "        Object parseArgument(String arg, String type) {\n";
  javaCodeString += "            switch (type) {\n";
  javaCodeString += '                case "array":\n';
  javaCodeString += "                    return new JSONArray(arg);\n";
  javaCodeString += '                case "number":\n';
  javaCodeString += "                    return Float.parseFloat(arg);\n";
  javaCodeString += '                case "string":\n';
  javaCodeString += "                    return arg;\n";
  javaCodeString += '                case "bool":\n';
  javaCodeString += "                    return Boolean.parseBoolean(arg);\n";
  javaCodeString += "                default:\n";
  javaCodeString += "                    return arg;\n";
  javaCodeString += "            }\n";
  javaCodeString += "        }\n\n";
  javaCodeString += "        boolean passed = false;\n";
  javaCodeString += "        int failedCase = -1;\n";
  javaCodeString += "        List<String> output = new ArrayList<>();\n";
  javaCodeString += "        long start = System.nanoTime();\n\n";
  javaCodeString += "        for (int i = 0; i < cases.size(); i++) {\n";
  javaCodeString += "            List<Object> args = new ArrayList<>();\n";
  javaCodeString +=
    "            for (int j = 0; j < cases.get(i).getInput().size(); j++) {\n";
  javaCodeString +=
    "                args.add(parseArgument(cases.get(i).getInput().get(j), argTypes.get(j)));\n";
  javaCodeString += "            }\n";
  javaCodeString +=
    "            Object result = " + fnName + "(args.toArray());\n\n";
  javaCodeString +=
    "            if (result instanceof JSONArray || result instanceof JSONObject) {\n";
  javaCodeString += "                result = result.toString();\n";
  javaCodeString += "            }\n\n";
  javaCodeString += "            System.out.println(result);\n";
  javaCodeString +=
    "            System.out.println(cases.get(i).getOutput());\n\n";
  javaCodeString +=
    "            if (result.toString().equals(cases.get(i).getOutput())) {\n";
  javaCodeString += "                output.add(result.toString());\n";
  javaCodeString += "                passed = true;\n";
  javaCodeString += "            } else {\n";
  javaCodeString += "                passed = false;\n";
  javaCodeString += "                failedCase = i;\n";
  javaCodeString += "                break;\n";
  javaCodeString += "            }\n";
  javaCodeString += "        }\n\n";
  javaCodeString += "        long end = System.nanoTime();\n\n";
  javaCodeString += "        JSONObject outputObj = new JSONObject();\n";
  javaCodeString += '        outputObj.put("output", output);\n';
  javaCodeString +=
    '        outputObj.put("executionTime", (end - start) / 1_000_000.0);\n';
  javaCodeString +=
    '        outputObj.put("memoryUsed", (double) Runtime.getRuntime().totalMemory() / (1024 * 1024));\n';
  javaCodeString += '        outputObj.put("passed", passed);\n';
  javaCodeString += '        outputObj.put("consoleOP", consoleOP);\n';
  javaCodeString += '        outputObj.put("failedCase", failedCase);\n\n';
  javaCodeString += "        vanillaLog.println(outputObj.toString());\n";
  javaCodeString += "    }\n";
  javaCodeString += "}";

  return javaCodeString;
};

const fetchOutput = async (code: string, cases: Case[]) => {
  try {
    const response = await fetch(process.env.COMPILER_ADDRESS!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "java",
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
      expectedOutput: string[];
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
      expectedOutput: cases.map((c) => c.output),
      internalStatus: output.passed ? "PASSED" : "FAILED",
      failedCaseNumber: output.failedCase,
      failedCase:
        output.failedCase === -1 ? ({} as Case) : cases[output.failedCase],
      error: data.error,
      language: data.language,
      info: data.info,
      consoleOP: output.consoleOP,
      runtime: parseFloat(output.executionTime),
      memoryUsage: parseFloat(output.memoryUsed),
    };

    return dataobj;
  } catch (error) {
    logger.error({ code: "LANGTEMP_JAVA_001", message: error });
  }
};

export default runJava;
