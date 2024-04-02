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

const Editor = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [question, setQuestion] = useState<any>();
  const [languages, setLanguages] = useState<string[]>([]);

  const [tabChange, setTabChange] = useState(0);
  const [paste, setPaste] = useState(0);

  const [tabChangeOpen, setTabChangeOpen] = useState(false);
  const [pasteOpen, setPasteOpen] = useState(false);

  const [timer, setTimer] = useState(
    JSON.parse(localStorage.getItem("timer") || "{}")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.seconds === 0) {
        if (timer.minutes === 0) {
          clearInterval(interval);
        } else {
          setTimer({
            minutes: timer.minutes - 1,
            seconds: 59,
          });
        }
      } else {
        setTimer({
          minutes: timer.minutes,
          seconds: timer.seconds - 1,
        });
      }
    }, 1000);

    localStorage.setItem("timer", JSON.stringify(timer));

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (paste > 1) {
      setPasteOpen(true);
    }
  }, [paste]);

  useEffect(() => {
    if (tabChange > 0) {
      setTabChangeOpen(true);
    }
  }, [tabChange]);

  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      setTabChange(tabChange + 1);
    }
  });

  useEffect(() => {
    const questionID = window.history.state.usr.id;
    setLanguages(window.history.state.usr.languages);

    console.log(window.history.state.usr.languages);

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/problems/${questionID}`)
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch question");
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-3 gap-3 ">
      <div className="w-full flex items-center justify-center">
        <Button className="mr-2 bg-green-500">
          <FaPlay className="mr-2 mt-0.5" size={12} /> Run
        </Button>
        <Button>Submit</Button>
        <p className=" justify-self-start ml-14">
          Time Left: {timer.minutes} mins {timer.seconds} secs
        </p>
      </div>
      <div className="flex gap-5">
        <Statement
          statement={question?.desc ? question?.desc : ({} as Delta)}
        />
        <div>
          <Split direction="vertical" className="split h-[89vh]">
            <CodeEditor
              func={question?.func ? question?.func : ""}
              returnType={question?.returnType ? question?.returnType : ""}
              args={question?.args ? question?.args : []}
              languages={languages}
              paste={paste}
              setPaste={setPaste}
            />
            <Terminal />
          </Split>
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
    </div>
  );
};

export default Editor;
