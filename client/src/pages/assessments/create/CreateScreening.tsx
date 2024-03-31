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
import Problem from "@/types/Problem";

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

  const [questions, setQuestions] = useState<Problem[]>([]);

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
    console.log("Save screening");
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
            <Questions selectedQuestions={questions} setSelectedQuestions={setQuestions} />
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
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CreateScreening;
