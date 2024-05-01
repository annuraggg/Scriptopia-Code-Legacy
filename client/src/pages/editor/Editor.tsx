import Split from "react-split";
import { Navbar } from "@/components/ui/navbar";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";
import Descriptor from "./Descriptor";
import { useEffect, useState } from "react";
import Meta from "@/types/ProblemMeta";
import { Case } from "@/types/TestCase";
import axios from "axios";
import returnStarter from "@/functions/StarterGenerator";
import JSConfetti from "js-confetti";
import SuccessDrawer from "./SuccessDrawer";
import { toast } from "sonner";
import Explain from "./Explain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Submissions from "./Submissions";
import PageLoading from "@/components/PageLoading";
import { Delta } from "quill/core";
import Problem from "@/types/Problem";
import { useTheme } from "@/components/theme-provider";

interface Submission {
  _id: string;
  problemID: string;
  userID: string;
  code: string;
  language: string;
  status: string;
  output: Record<string, string>;
}

interface OutputType {
  output: string[];
  runtime: number;
  memoryUsage: number;
  internalStatus: string;
  failedCase: Case;
  failedCaseNumber: number;
  error: string;
}

function App() {
  const [statement, setStatement] = useState<Delta>({} as Delta);
  const [meta, setMeta] = useState<Meta>({} as Meta);
  const [code, setCode] = useState<string>("");
  const [cases, setCases] = useState<Case[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [vars, setVars] = useState<
    {
      key: string;
      type: string;
    }[]
  >([]);
  const [fn, setFn] = useState<string>("");
  const [output, setOutput] = useState<OutputType>({} as OutputType);
  const [loading, setLoading] = useState(true);

  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState<number>(0);

  const [bgOverlay, setBgOverlay] = useState(0);
  const jsConfetti = new JSConfetti();

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [memoryUsed, setMemoryUsed] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [openSheet, setOpenSheet] = useState(false);
  const [sheetLoading, setSheetLoading] = useState(false);
  const [explainResponse, setExplainResponse] = useState("");
  const [explainCodeStr, setExplainCodeStr] = useState<string>("");
  const [sheetError, setSheetError] = useState(false);

  const [totalRuns, setTotalRuns] = useState<number>(0);

  const [submissions, setSubmissions] = useState<Submission[]>(
    [] as Submission[]
  );

  const [error, setError] = useState("");

  const [recommendations, setRecommendations] = useState<Problem>(
    {} as Problem
  );

  const [memoryData, setMemoryData] = useState({
    percent: 0,
    avg: 0,
  });

  const [timeData, setTimeData] = useState({
    percent: 0,
    avg: 0,
  });

  const { theme } = useTheme();

  useEffect(() => {
    const probId = window.location.pathname.split("/").pop();
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/problems/${probId}`)
      .then((res) => {
        const response = res.data;
        setStatement(response.desc);
        setMeta(response.meta);
        setCases(response.cases);
        setFn(response.func);
        const starter = returnStarter(
          "javascript",
          response.func,
          response.returnType,
          response.args
        );
        setCode(starter);
        setVars(response.args);
        setSubmissions(response.submissions);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const runCode = async (code: string, language: string) => {
    setRunning(true);
    setTotalRuns((prev) => prev + 1);
    let error = false;
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/compiler/run`,
        {
          code,
          language,
          cases,
          fn,
          probID: meta.id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setConsoleOutput(res.data.output.consoleOP);
        setOutput(res.data.output);
        setRuns((prev) => prev + 1);
        setError(res.data.output.error);
      })
      .catch((err) => {
        console.log(err);
        error = true;
      })
      .finally(() => {
        setRunning(false);
      });

    return new Promise((_resolve, reject) => {
      if (error) {
        reject("Something went wrong!");
      } else {
        _resolve("");
      }
    });
  };

  const submitCode = async (code: string, language: string, timer: number) => {
    setRunning(true);
    let error = false;
    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/compiler/submit`,
        {
          code,
          language,
          cases,
          fn,
          probID: meta.id,
          timer,
          totalRuns,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setConsoleOutput(res.data.output.consoleOP);
        setOutput(res.data.output);
        setRuns((prev) => prev + 1);
        setError(res.data.output.error);

        if (
          res.data.output.internalStatus === "PASSED" &&
          res.data.output.failedCaseNumber === -1
        ) {
          setSubmitSuccess(true);
          setTimeTaken(res.data.output.runtime);
          setMemoryUsed(res.data.output.memoryUsage);
          setRecommendations(res.data.suggestion);
          setMemoryData(res.data.timeEfficiency);
          setTimeData(res.data.spaceEfficiency);
          jsConfetti.addConfetti();
          setDrawerOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
        error = true;
      })
      .finally(() => {
        setRunning(false);
        setTotalRuns(0);
      });

    return new Promise((_resolve, reject) => {
      if (error) {
        reject("Something went wrong!");
      } else {
        _resolve("");
      }
    });
  };

  const explainCode = async (value: string) => {
    setSheetLoading(true);
    setOpenSheet(true);
    setExplainCodeStr(value);

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/compiler/explain`, {
        code: value,
      })
      .then((res) => {
        setExplainResponse(res.data.response);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.error(err.response.data.message);
        setSheetError(true);
      })
      .finally(() => {
        setSheetLoading(false);
      });
  };

  const setOpenValue = (val: boolean) => {
    setOpenSheet(val);
  };

  useEffect(() => {
    if (
      runs > 0 &&
      running === false &&
      cases[0]?.output !== undefined &&
      cases[1]?.output !== undefined &&
      cases[2]?.output !== undefined
    ) {
      if (
        cases[0]?.output === output.output[0] &&
        cases[1]?.output === output.output[1] &&
        cases[2]?.output === output.output[2]
      ) {
        setBgOverlay(1);
      } else {
        setBgOverlay(2);
      }
    } else if (running === true) {
      setBgOverlay(0);
    }
  }, [output, runs, running, cases]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div vaul-drawer-wrapper="">
      <div
        className={` ${
          !running ? "opacity-100" : "opacity-0"
        } flex items-center justify-center text-white text-2xl font-bold transition-all duration-500 ease-in-out h-[100vh] absolute w-full z-[-5]`}
        style={{
          background:
            bgOverlay === 1
              ? `radial-gradient(circle, ${
                  theme === "dark" ? "rgba(0,45,0,1)" : "rgba(0,200,0,.2)"
                } 0%, rgba(244,8,23,0) 100%)`
              : bgOverlay === 2
              ? `radial-gradient(circle, rgba(45,1,1, ${
                  theme === "dark" ? "1" : ".2"
                }) 0%, rgba(244,8,23,0) 100%)`
              : "",
        }}
      ></div>
      <Navbar />

      <div
        className={`flex gap-5 px-5 h-[90vh] overflow-y-auto flex-col md:flex-row`}
      >
        <div className="md:w-[50%] w-[100%] z-10">
          <Tabs defaultValue="problem">
            <TabsList>
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="problem">
              <ProblemStatement statement={statement} meta={meta} />
            </TabsContent>
            <TabsContent value="submissions">
              <Submissions submissions={submissions} />
            </TabsContent>
            <TabsContent value="discussion">No Discussion Yet.</TabsContent>
          </Tabs>
        </div>
        <Split
          className="md:w-[50%] w-[100%] h-[90vh] split z-20"
          direction="vertical"
        >
          <CodeEditor
            runCode={runCode}
            code={code}
            submitCode={submitCode}
            explainCode={explainCode}
          />
          <Descriptor
            cases={cases}
            consoleOutput={consoleOutput}
            running={running}
            runs={runs}
            vars={vars}
            output={output.output}
            error={error}
            failedCase={output.failedCase}
            failedCaseNumber={output.failedCaseNumber}
          />
        </Split>
      </div>
      {submitSuccess && (
        <SuccessDrawer
          memoryUsed={memoryUsed}
          timeTaken={timeTaken}
          open={drawerOpen}
          setOpen={setDrawerOpen}
          recommendation={recommendations}
          memoryData={memoryData}
          timeData={timeData}
        />
      )}
      <Explain
        open={openSheet}
        setOpen={setOpenValue}
        code={explainCodeStr}
        responseStr={explainResponse}
        loading={sheetLoading}
        err={sheetError}
      />
    </div>
  );
}
export default App;
