import Split from "react-split";
import { Navbar } from "@/components/ui/navbar";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";
import Descriptor from "./Descriptor";
import { useEffect, useState } from "react";
import { Delta } from "quill/core";
import Meta from "@/types/ProblemMeta";
import { Case } from "@/types/TestCase";
import axios from "axios";
import returnStarter from "@/components/StarterGenerator";

function App() {
  const [statement, setStatement] = useState<Delta>({} as Delta);
  const [meta, setMeta] = useState<Meta>({} as Meta);
  const [code, setCode] = useState<string>("");
  const [cases, setCases] = useState<Case[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [vars, setVars] = useState<any>({});
  const [fn, setFn] = useState<string>("");
  const [output, setOutput] = useState<any>("" as any);

  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState<number>(0);

  const [bgOverlay, setBgOverlay] = useState(0);

  useEffect(() => {
    const probId = window.location.pathname.split("/").pop();
    axios
      .get(`${import.meta.env.VITE_BACKEND_ADDRESS}/problems/${probId}`)
      .then((res) => {
        const response = res.data;
        setStatement(response.desc);
        setMeta(response.meta);
        setCases(response.cases);
        setFn(response.func);
        const starter = returnStarter(
          "javascript",
          response.func,
          response.args
        );
        setCode(starter);
        setVars(response.args);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const runCode = async (code: string, language: string) => {
    setRunning(true);
    let err = false;
    await axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/compiler/run`, {
        code,
        language,
        cases,
        fn,
      })
      .then((res) => {
        setConsoleOutput(res.data.console);
        setOutput(res.data.output);
        setRuns((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
        err = true;
      })
      .finally(() => {
        setRunning(false);
      });

    return new Promise((_resolve, reject) => {
      if (err) {
        reject("Something went wrong!");
      } else {
        _resolve("");
      }
    });
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

  return (
    <div>
      <div
        className={` ${
         !running ? "opacity-100" : "opacity-0"
        } flex items-center justify-center text-white text-2xl font-bold transition-all duration-500 ease-in-out h-[100vh] absolute w-full`}
        style={{
          background:
            bgOverlay === 1
              ? "radial-gradient(circle, rgba(1,45,9,1) 0%, rgba(2,8,23,1) 100%)"
              : bgOverlay === 2
              ? " radial-gradient(circle, rgba(45,1,1,1) 0%, rgba(2,8,23,1) 100%)"
              : "radial-gradient(circle, rgba(13,15,0,1) 0%, rgba(2,8,23,1) 100%)",
        }}
      ></div>
      <Navbar />

      <div
        className={`flex gap-5 px-5 h-[90vh] overflow-y-auto flex-col md:flex-row`}
      >
        <ProblemStatement statement={statement} meta={meta} />
        <Split className="md:w-[50%] w-[100%] h-[90vh]" direction="vertical">
          <CodeEditor runCode={runCode} code={code} />
          <Descriptor
            cases={cases}
            consoleOutput={consoleOutput}
            running={running}
            runs={runs}
            vars={vars}
            output={output.output}
          />
        </Split>
      </div>
    </div>
  );
}
export default App;
