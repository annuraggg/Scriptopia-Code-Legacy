/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Statement from "./Statement";
import axios from "axios";
import { toast } from "sonner";
import { Delta } from "quill/core";
import CodeEditor from "./CodeEditor";
import Split from "react-split";
import Terminal from "./Terminal";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Screening from "@/types/Screenings";
import returnStarter from "@/functions/StarterGenerator";

const Editor = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [question, setQuestion] = useState<any>();
  const [languages, setLanguages] = useState<string[]>([]);

  const [tabChange, setTabChange] = useState(0);
  const [paste, setPaste] = useState(0);

  const [tabChangeOpen, setTabChangeOpen] = useState(false);
  const [pasteOpen, setPasteOpen] = useState(false);

  const [screening, setScreening] = useState({} as Screening);

  const [submitOpen, setSubmitOpen] = useState(false);

  const [code, setCode] = useState("");

  const [fullScreenExit, setFullScreenExit] = useState(0);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState(
    languages[0] || "javascript"
  );

  const [timer, setTimer] = useState(
    JSON.parse(localStorage.getItem("timer") || "{}")
  );
  const [initialTimer] = useState(localStorage.getItem("timer") || "{}");

  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState(0);
  const [output, setOutput] = useState<any>("" as any);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [error, setError] = useState("");

  const [isTabChangeEnabled, setIsTabChangeEnabled] = useState(false);
  const [isPasteEnabled, setIsPasteEnabled] = useState(false);
  const [isFullScreenEnabled, setIsFullScreenEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer?.seconds === 0) {
        if (timer?.minutes === 0) {
          clearInterval(interval);
        } else {
          setTimer({
            minutes: timer?.minutes - 1,
            seconds: 59,
          });
        }
      } else {
        setTimer({
          minutes: timer?.minutes,
          seconds: timer?.seconds - 1,
        });
      }

      if (!isFullScreenEnabled) return;
      const isFullScreen = window.screenTop && window.screenY;

      if (!isFullScreen) {
        setFullScreenOpen(true);
      }
    }, 1000);

    localStorage?.setItem("timer", JSON?.stringify(timer));

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!isPasteEnabled) return;
    if (paste > 1) {
      setPasteOpen(true);
    }
  }, [paste]);

  useEffect(() => {
    if (!isTabChangeEnabled) return;

    if (tabChange > 0) {
      setTabChangeOpen(true);
    }
  }, [tabChange]);

  window?.addEventListener("visibilitychange", () => {
    if (document?.visibilityState === "visible") {
      setTabChange(tabChange + 1);
    }
  });

  useEffect(() => {
    const questionID = window?.history?.state?.usr?.id;
    setScreening(window?.history?.state?.usr?.screening);
    setLanguages(window?.history?.state?.usr?.languages);
    setIsTabChangeEnabled(window?.history?.state?.usr?.tabChange);
    setIsPasteEnabled(window?.history?.state?.usr?.paste);
    setIsFullScreenEnabled(window?.history?.state?.usr?.fullScreen);

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/problems/${questionID}`)
      .then((res) => {
        console.log(res?.data);
        setQuestion(res?.data);
        const starter = returnStarter(
          "javascript",
          res?.data?.func,
          res?.data?.returnType,
          res?.data?.args ? question?.args : []
        );
        setCode(starter);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch question");
      });
  }, []);

  useEffect(() => {
    if (question) {
      setCode(
        returnStarter(
          selectedLang,
          question?.func,
          question?.returnType,
          question?.args ? question?.args : []
        )
      );
    }
  }, [selectedLang]);

  const submitCode = () => {
    const saveObj = {
      code,
      lang: selectedLang,
      probID: question?.meta?.id,
      totalTime:
        JSON?.parse(initialTimer)?.minutes * 60 +
        JSON?.parse(initialTimer)?.seconds -
        (timer?.minutes * 60 + timer?.seconds),
      runs,
      paste,
      fullScreenExit: fullScreenExit,
      tabChange,
      output,
      consoleOutput,
      error,
    };

    const oldData = localStorage?.getItem("submission");
    const data = oldData ? JSON?.parse(oldData) : [];
    data?.push(saveObj);
    localStorage?.setItem("submission", JSON?.stringify(data));

    window?.history?.back();
    toast?.success("Code submitted successfully");
  };

  const runCode = () => {
    if (!code) {
      toast?.error("Please write some code before running");
    }

    setRuns((prev) => prev + 1);
    setRunning(true);

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/compiler/run`, {
        code,
        language: selectedLang,
        cases: question?.cases,
        fn: question?.func,
        probID: question?.meta?.id,
      })
      .then((res) => {
        setConsoleOutput(res?.data?.output?.consoleOP);
        setOutput(res?.data?.output);
        setError(res?.data?.output?.error);
      })
      .catch((err) => {
        console.log(err);
        err = true;
      })
      .finally(() => {
        setRunning(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 gap-3 ">
      <div className="w-full flex items-center justify-center">
        {screening?.editorOptions?.runCode && (
          <Button
            className="mr-2 bg-green-500"
            onClick={runCode}
            disabled={running}
          >
            <FaPlay className="mr-2 mt-0.5" size={12} /> Run
          </Button>
        )}
        <Button onClick={() => setSubmitOpen(true)} disabled={running}>
          Submit
        </Button>
        <p className=" justify-self-start ml-14">
          Time Left: {timer?.minutes} mins {timer?.seconds} secs
        </p>
      </div>
      <div className="flex gap-5">
        <Statement
          statement={question?.desc ? question?.desc : ({} as Delta)}
        />
        <div>
          {screening?.editorOptions?.runCode ? (
            <Split direction="vertical" className="split h-[89vh]">
              <CodeEditor
                languages={languages}
                paste={paste}
                setPaste={setPaste}
                syntaxHighlighting={
                  screening?.editorOptions?.syntaxHighlighting
                }
                autocomplete={screening?.editorOptions?.autoComplete}
                code={code}
                setCode={setCode}
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
              />
              <Terminal
                cases={question?.cases}
                consoleOutput={consoleOutput}
                running={running}
                runs={runs}
                vars={question?.args}
                output={output?.output ? output?.output : []}
                error={error}
                failedCase={output?.failedCase}
                failedCaseNumber={output?.failedCaseNumber}
              />
            </Split>
          ) : (
            <CodeEditor
              languages={languages}
              paste={paste}
              setPaste={setPaste}
              syntaxHighlighting={screening?.editorOptions?.syntaxHighlighting}
              autocomplete={screening?.editorOptions?.autoComplete}
              code={code}
              setCode={setCode}
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
            />
          )}
        </div>
      </div>

      <Dialog open={tabChangeOpen} onOpenChange={setTabChangeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>We Detected a Tab Change</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            You have switched tabs {tabChange} time(s). This may be considered
            suspicious behavior and may result in a disqualification.
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={fullScreenOpen} onOpenChange={setFullScreenOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>We Detected a FullScreen Exit</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            You have exited the fullscreen. This may be
            considered suspicious behavior and may result in a disqualification.
          </DialogDescription>
          <Button
            onClick={() => {
              document.body.requestFullscreen();
              setFullScreenOpen(false);
              setFullScreenExit(fullScreenExit + 1);
            }}
          >
            Go Fullscreen
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={pasteOpen} onOpenChange={setPasteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>We Detected a Copy-Paste</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            You have copied and pasted code from outside the code editor {paste}{" "}
            time(s). This may be considered suspicious behavior and may result
            in a disqualification.
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <AlertDialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Your code will be submitted and you will not be able to make any
              changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submitCode}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Editor;
