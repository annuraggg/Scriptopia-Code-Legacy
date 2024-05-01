import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Button } from "@/components/ui/button";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { BsStars } from "react-icons/bs";
import { useTheme } from "@/components/theme-provider";

const CodeEditor = ({
  runCode,
  code,
  submitCode,
  explainCode,
}: {
  runCode: (code: string, language: string) => Promise<unknown>;
  code: string;
  submitCode: (
    code: string,
    language: string,
    time: number
  ) => Promise<unknown>;
  explainCode: (code: string) => void;
}) => {
  const [value, setValue] = useState("");
  const [running, setRunning] = useState(false);
  const [codeStarted, setCodeStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const language = "javascript";

  useEffect(() => {
    // fetch data
    setValue(code);
  }, [code]);

  useEffect(() => {
    if (codeStarted) {
      setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  }, [codeStarted]);

  const onChange = useCallback((val: SetStateAction<string>) => {
    setValue(val);
  }, []);

  const runOnParent = async () => {
    setRunning(true);
    runCode(value, language)
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setRunning(false);
      });
  };

  const submitOnParent = async () => {
    setRunning(true);
    submitCode(value, language, timer)
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setRunning(false);
        setTimer(0);
        setCodeStarted(false);
      });
  };

  const generateSummary = () => {
    explainCode(value);
  };

  const { theme } = useTheme();

  return (
    <div className="overflow-y-auto rounded ">
      <div className="bg-secondary rounded-t sticky z-50 top-0 border p-1 px-7 text-gray-400 flex justify-between">
        <div className="flex items-center justify-center">
          <p>JavaScript</p>
          <Button className="ml-3" variant="link" onClick={generateSummary}>
            <BsStars size={12} />
            <p className="text-xs ml-2">Explain Code</p>
          </Button>
        </div>
        <div className="flex gap-1 items-center">
          <Button
            variant="link"
            onClick={runOnParent}
            disabled={running ? true : false}
          >
            {running ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Run
          </Button>
          <Button
            variant="default"
            disabled={running ? true : false}
            onClick={submitOnParent}
          >
            Submit
          </Button>
        </div>
      </div>
      <CodeMirror
        className="rounded-1xl"
        value={value}
        height="70vh"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        onClick={() => setCodeStarted(true)}
        theme={theme as "dark" | "light"}
      />
    </div>
  );
};

export default CodeEditor;
