import { useTheme } from "@/components/theme-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Case } from "@/types/TestCase";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const Descriptor = ({
  cases,
  consoleOutput,
  running,
  runs,
  vars,
  output,
  error,
  failedCaseNumber,
  failedCase,
}: {
  cases: Case[];
  consoleOutput: string[];
  running: boolean;
  runs: number;
  vars: {
    key: string;
    type: string;
  }[];
  output: string[];
  error: string;
  failedCaseNumber: number;
  failedCase: Case;
}) => {
  const [currTab, setCurrTab] = useState("console");

  useEffect(() => {
    if (runs > 0) {
      setCurrTab("tests");
      console.log(cases);
    }
  }, [cases, runs]);

  const { theme } = useTheme();

  return (
    <div className={`rounded bg-secondary h-[45vh] overflow-y-auto relative`}>
      <Tabs
        value={currTab}
        onValueChange={(value) => {
          setCurrTab(value);
        }}
        className="bg-secondary rounded-t-lg"
      >
        <TabsList className="bg-secondary sticky top-0 w-full justify-start px-5 pt-7 pb-5">
          <TabsTrigger value="console">Console</TabsTrigger>
          <TabsTrigger value="tests">Test Cases</TabsTrigger>
        </TabsList>

        <TabsContent
          value="console"
          className={`px-5 py-2 ${
            error
              ? " bg-red-950 bg-opacity-50"
              : theme === "dark"
              ? "bg-black"
              : "bg-white"
          } mx-5 my-2 rounded min-h-[35vh]`}
        >
          {running ? (
            <div className="flex items-center justify-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </div>
          ) : runs === 0 ? (
            <p className="text-center text-gray-400">
              Run the code atleast once to see Console Output
            </p>
          ) : error != "" ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div
              className={`${
                theme === "dark" ? "bg-black" : "bg-white"
              } text-white`}
            >
              {consoleOutput.map((output, i) => {
                return (
                  <p key={i} className="text-gray-400">
                    {output}
                  </p>
                );
              })}
            </div>
          )}
        </TabsContent>
        <TabsContent value="tests" className="px-5 py-2">
          {running ? (
            <div className="flex items-center justify-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </div>
          ) : runs === 0 ? (
            <p className="text-center text-gray-400">
              Run the code atleast once to see results
            </p>
          ) : (
            <Tabs defaultValue="case1" className="bg-secondary rounded-t-lg">
              <TabsList className=" bg-secondary ">
                {cases?.map((c, i) => {
                  if (i < 3) {
                    return (
                      <TabsTrigger key={i} value={`case${i + 1}`}>
                        <div
                          className={`${
                            cases[i]?.output == output[i]
                              ? "bg-green-500"
                              : "bg-red-500"
                          } h-1 w-1 mr-2 rounded-full`}
                        ></div>
                        Case {i + 1}
                      </TabsTrigger>
                    );
                  }
                })}
                {failedCaseNumber >= 3 && (
                  <TabsTrigger value="fc">
                    <div className="bg-red-500 h-1 w-1 mr-2 rounded-full"></div>
                    Failed Case
                  </TabsTrigger>
                )}
              </TabsList>
              {cases?.map((c, i) => {
                if (i < 3) {
                  return (
                    <TabsContent key={i} value={`case${i + 1}`}>
                      <p>Input</p>
                      <div className="bg-primary-foreground px-5 py-3 my-2 rounded-sm">
                        {c?.input?.map((ci, i2) => {
                          return vars[i2].key + " = " + ci + " ";
                        })}
                      </div>
                      <p>Output</p>
                      <div className="bg-primary-foreground px-5 py-3 my-2 rounded-sm">
                        {output[i]}
                      </div>
                      <p>Expected</p>
                      <div className="bg-primary-foreground px-5 py-3 my-2 rounded-sm">
                        {c?.output}
                      </div>
                    </TabsContent>
                  );
                }
              })}
              <TabsContent value="fc">
                <p>Input</p>
                <div className="bg-gray-700 px-5 py-3 my-2 rounded-sm">
                  {failedCase?.input?.map((ci, i2) => {
                    return vars[i2].key + " = " + ci + " ";
                  })}
                </div>
                <p>Output</p>
                <div className="bg-gray-700 px-5 py-3 my-2 rounded-sm">
                  {failedCase.output}
                </div>
                <p>Expected</p>
                <div className="bg-gray-700 px-5 py-3 my-2 rounded-sm">
                  {cases[failedCaseNumber]?.output}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Descriptor;
