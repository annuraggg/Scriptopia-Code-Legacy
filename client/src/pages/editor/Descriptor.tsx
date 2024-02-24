import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Case } from "@/types/TestCase";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

const Descriptor = ({
  cases,
  consoleOutput,
  running,
  runs,
  vars,
  output,
}: {
  cases: Case[];
  consoleOutput: string;
  running: boolean;
  runs: number;
  vars: any;
  output: string[];
}) => {
  const [currTab, setCurrTab] = useState("console");

  useEffect(() => {
    if (runs > 0) {
      setCurrTab("tests");
    }
  }, [runs]);

  return (
    <div
      className={`rounded bg-secondary px-5 py-2 h-[45vh] overflow-y-auto relative`}
    >
      <Tabs
        value={currTab}
        onValueChange={(value) => {
          setCurrTab(value);
        }}
        className="bg-secondary rounded-t-lg"
      >
        <TabsList className="bg-secondary sticky top-0 w-full justify-start">
          <TabsTrigger value="console">Console</TabsTrigger>
          <TabsTrigger value="tests">Test Cases</TabsTrigger>
        </TabsList>

        <TabsContent value="console">
          {running ? (
            <div className="flex items-center justify-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </div>
          ) : runs === 0 ? (
            <p className="text-center text-gray-400">
              Run the code atleast once to see Console Output
            </p>
          ) : (
            <pre>{consoleOutput}</pre>
          )}
        </TabsContent>
        <TabsContent value="tests">
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
                <TabsTrigger value="case1">
                  {" "}
                  <div
                    className={`${
                      cases[0]?.output === output[0]
                        ? "bg-green-500"
                        : "bg-red-500"
                    } h-1 w-1 mr-2 rounded-full`}
                  ></div>{" "}
                  Case 1
                </TabsTrigger>
                <TabsTrigger value="case2">
                  <div
                    className={`${
                      cases[1]?.output === output[1]
                        ? "bg-green-500"
                        : "bg-red-500"
                    } h-1 w-1 mr-2 rounded-full`}
                  ></div>
                  Case 2
                </TabsTrigger>
                <TabsTrigger value="case3">
                  <div
                    className={`${
                      cases[2]?.output === output[2]
                        ? "bg-green-500"
                        : "bg-red-500"
                    } h-1 w-1 mr-2 rounded-full`}
                  ></div>
                  Case 3
                </TabsTrigger>
              </TabsList>
              {cases?.map((c, i) => {
                if (i < 3) {
                  return (
                    <TabsContent key={i} value={`case${i + 1}`}>
                      <p>Input</p>
                      <div className="bg-gray-700 px-5 py-3 my-2 rounded-sm">
                        {c?.input?.map((ci, i2) => {
                          return vars[i2] + " = " + ci;
                        })}
                      </div>
                      <p>Output</p>
                      <div className="bg-gray-700 px-5 py-3 my-2 rounded-sm">
                        {output[i]}
                      </div>
                      <p>Expected</p>
                      <div className="bg-gray-700 px-5 py-3 my-2 rounded-sm">
                        {c?.output}
                      </div>
                    </TabsContent>
                  );
                }
              })}
            </Tabs>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Descriptor;
