/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./General";
import Questions from "./Questions";
import Candidates from "./Candidates";
import Instructions from "./Instructions";
import Security from "./Security";
import Feedback from "./Feedback";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toast } from "sonner";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdContentCopy } from "react-icons/md";
import { Button } from "@/components/ui/button";

const CreateScreening = () => {
  const [tab, setTab] = useState("general");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [allowAutocomplete, setAllowAutocomplete] = useState<boolean>(false);
  const [allowRunCode, setAllowRunCode] = useState<boolean>(false);
  const [allowSyntaxHighlighting, setAllowSyntaxHighlighting] =
    useState<boolean>(false);
  const [range, setRange] = useState<DateRange>({} as DateRange);
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");

  const [questions, setQuestions] = useState<any>([]);

  const [candidates, setCandidates] = useState<
    {
      name: string;
      email: string;
    }[]
  >([]);
  const [access, setAccess] = useState("all");

  const [instructions, setInstructions] = useState<string>("");

  const [codePlaybacks, setCodePlaybacks] = useState<boolean>(false);
  const [tabChangeDetection, setTabChangeDetection] = useState<boolean>(false);
  const [gptDetection, setGptDetection] = useState<boolean>(false);
  const [copyPasteDetection, setCopyPasteDetection] = useState<boolean>(false);
  const [plagiarismDetection, setPlagiarismDetection] =
    useState<boolean>(false);

  const [feedbackEmail, setFeedbackEmail] = useState<string>("");
  const [feedbackPhone, setFeedbackPhone] = useState<string>("");

  const [saving, setSaving] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [link, setLink] = useState<string>("" as any);

  const goBack = () => {
    const tabs = [
      "general",
      "questions",
      "candidates",
      "instructions",
      "scoring",
      "security",
      "feedback",
    ];
    const currentIndex = tabs.indexOf(tab);
    if (currentIndex > 0) {
      setTab(tabs[currentIndex - 1]);
    } else {
      setTab("feedback");
    }
  };

  const goForward = () => {
    const tabs = [
      "general",
      "questions",
      "candidates",
      "instructions",
      "scoring",
      "security",
      "feedback",
    ];
    const currentIndex = tabs.indexOf(tab);
    if (currentIndex < tabs.length - 1) {
      setTab(tabs[currentIndex + 1]);
    } else {
      setTab("general");
    }
  };

  const save = () => {
    if (
      name === "" ||
      description === "" ||
      instructions === "" ||
      timeLimit === 0 ||
      range.from === undefined ||
      range.to === undefined ||
      questions.length === 0 ||
      instructions === "" ||
      feedbackEmail === "" ||
      feedbackPhone === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    setSaving(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/create`, {
        name,
        desc: description,
        instructions,
        duration: timeLimit,
        openRange: {
          start: range.from,
          end: range.to,
        },
        questions,
        candidates,
        editorOptions: {
          autoComplete: allowAutocomplete,
          runCode: allowRunCode,
          syntaxHighlighting: allowSyntaxHighlighting,
        },
        security: {
          codePlayback: codePlaybacks,
          tabChangeDetection,
          gptDetection,
          copyPasteDetection,
          plagiarismDetection,
        },
        feedback: {
          email: feedbackEmail,
          phone: feedbackPhone,
        },
      })
      .then((res) => {
        setLink(res.data.link);
        setShowCode(true);
        toast.success("Screening created successfully");
        setSaving(false);
      })
      .catch(() => {
        toast.error("Error creating screening");
        setSaving(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex px-10" vaul-drawer-wrapper="">
        <Tabs
          defaultValue="account"
          className="flex flex-col w-full"
          value={tab}
          onValueChange={setTab}
        >
          <div className="flex items-center justify-center gap-2">
            <div
              className="bg-secondary p-[10px] rounded-lg  cursor-pointer hover:scale-110 duration-100"
              onClick={goBack}
            >
              <IoIosArrowBack />
            </div>
            <TabsList className="self-center">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              {/*}<TabsTrigger value="scoring">Scoring</TabsTrigger>{*/}
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            <div
              className="bg-secondary p-[10px] rounded-lg cursor-pointer hover:scale-110 duration-100"
              onClick={goForward}
            >
              <IoIosArrowForward />
            </div>
          </div>
          <TabsContent value="general">
            <General
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              timeLimit={timeLimit}
              setTimeLimit={setTimeLimit}
              allowAutocomplete={allowAutocomplete}
              setAllowAutocomplete={setAllowAutocomplete}
              allowRunCode={allowRunCode}
              setAllowRunCode={setAllowRunCode}
              allowSyntaxHighlighting={allowSyntaxHighlighting}
              setAllowSyntaxHighlighting={setAllowSyntaxHighlighting}
              range={range}
              setRange={setRange}
              fromTime={fromTime}
              setFromTime={setFromTime}
              toTime={toTime}
              setToTime={setToTime}
            />
          </TabsContent>
          <TabsContent value="questions">
            <Questions
              selectedQuestions={questions}
              setSelectedQuestions={setQuestions}
            />
          </TabsContent>
          <TabsContent value="candidates">
            <Candidates
              candidates={candidates}
              setCandidates={setCandidates}
              access={access}
              setAccess={setAccess}
            />
          </TabsContent>
          <TabsContent value="instructions">
            <Instructions
              instructions={instructions}
              setInstructions={setInstructions}
            />
          </TabsContent>
          {/*}
          <TabsContent value="scoring">
            <Scoring nextTab={nextTab} />
          </TabsContent>
          {*/}
          <TabsContent value="security">
            <Security
              codePlaybacks={codePlaybacks}
              setCodePlaybacks={setCodePlaybacks}
              tabChangeDetection={tabChangeDetection}
              setTabChangeDetection={setTabChangeDetection}
              gptDetection={gptDetection}
              setGptDetection={setGptDetection}
              copyPasteDetection={copyPasteDetection}
              setCopyPasteDetection={setCopyPasteDetection}
              plagiarismDetection={plagiarismDetection}
              setPlagiarismDetection={setPlagiarismDetection}
            />
          </TabsContent>
          <TabsContent value="feedback">
            <Feedback
              feedbackEmail={feedbackEmail}
              setFeedbackEmail={setFeedbackEmail}
              feedbackPhone={feedbackPhone}
              setFeedbackPhone={setFeedbackPhone}
              saveScreening={save}
              saving={saving}
            />
          </TabsContent>
        </Tabs>

        <Dialog open={showCode} onOpenChange={setShowCode}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Done!</DialogTitle>
              <DialogDescription>
                You can use this link to share the screening with the candidates
              </DialogDescription>
              <div className="flex flex-col items-center justify-center pt-10">
                <p className="bg-gray-800 px-5 py-2 rounded-lg flex gap-5 items-center">
                  {`${import.meta.env.VITE_FRONTEND_ADDRESS}/r/${link}`}
                  <MdContentCopy
                    className=" cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_ADDRESS}/r/${link}`);
                      toast.success("Link copied to clipboard");
                    }}
                  />
                </p>
                <Button onClick={() => setShowCode(false)} className="mt-5">
                  Close
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateScreening;
