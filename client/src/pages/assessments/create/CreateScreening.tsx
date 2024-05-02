/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./General";
import Questions from "./Questions";
import Candidates from "./Candidates";
import Instructions from "./Instructions";
import Security from "./Security";
import Feedback from "./Feedback";
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const CreateScreening = () => {
  const navigate = useNavigate();
  const [updateID, setUpdateID] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
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
  const [passingPercentage, setPassingPercentage] = useState<number>(0);

  const [languages, setLanguages] = useState<string[]>([]);

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
  const [fullScreenExitDetection, setFullScreenExitDetection] =
    useState<boolean>(false);
  const [plagiarismDetection, setPlagiarismDetection] =
    useState<boolean>(false);

  const [feedbackEmail, setFeedbackEmail] = useState<string>("");
  const [feedbackPhone, setFeedbackPhone] = useState<string>("");

  const [saving, setSaving] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [link, setLink] = useState<string>("" as any);

  useEffect(() => {
    const editKeyword = window.location.pathname.split("/").pop();
    const isUpdate = editKeyword === "edit";

    const padZero = (num: number) => (num < 10 ? "0" + num : num);

    setIsUpdate(isUpdate);

    if (isUpdate) {
      const updateID = window.location.pathname.split("/")[2];
      setUpdateID(updateID);
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/get/${updateID}`
        )
        .then((res) => {
          const updateData = res.data;
          const toTime = `${padZero(
            new Date(updateData.openRange.end).getHours()
          )}:${padZero(new Date(updateData.openRange.end).getMinutes())}`;
          const fromTime = `${padZero(
            new Date(updateData.openRange.start).getHours()
          )}:${padZero(new Date(updateData.openRange.start).getMinutes())}`;

          setName(updateData.name);
          setDescription(updateData.desc);
          setTimeLimit(updateData.duration);
          setAllowAutocomplete(updateData.editorOptions.autoComplete);
          setAllowRunCode(updateData.editorOptions.runCode);
          setAllowSyntaxHighlighting(
            updateData.editorOptions.syntaxHighlighting
          );
          setRange({
            from: new Date(updateData.openRange.start),
            to: new Date(updateData.openRange.end),
          });
          setFromTime(fromTime);
          setToTime(toTime);
          setQuestions(updateData.questions);
          setPassingPercentage(updateData.passPercentage);
          setLanguages(updateData.languages);
          setCandidates(updateData.candidates);
          setAccess(updateData.access);
          setInstructions(updateData.instructions);
          setCodePlaybacks(updateData.security.codePlayback);
          setTabChangeDetection(updateData.security.tabChangeDetection);
          setGptDetection(updateData.security.gptDetection);
          setCopyPasteDetection(updateData.security.copyPasteDetection);
          setPlagiarismDetection(updateData.security.plagiarismDetection);
          setFullScreenExitDetection(
            updateData.security.fullScreenExitDetection
          );
          setFeedbackEmail(updateData.feedback.email);
          setFeedbackPhone(updateData.feedback.phone);
        })
        .catch(() => {
          toast.error("Error fetching screening data");
        });
    }
  }, []);

  const goBack = () => {
    const tabs = [
      "general",
      "questions",
      "candidates",
      "instructions",
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

    const emailRe = /\S+@\S+\.\S+/;
    if (!emailRe.test(feedbackEmail)) {
      toast.error("Please enter a valid email");
      return;
    }

    const phoneRe = /^[0-9]{10}$/;
    if (!phoneRe.test(feedbackPhone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // generate new Date() start time from range.from and fromTime
    const fromTimeSplit = fromTime.split(":");
    const fromTimeDate = new Date(range.from?.toString());
    fromTimeDate.setHours(parseInt(fromTimeSplit[0]));
    fromTimeDate.setMinutes(parseInt(fromTimeSplit[1]));
    fromTimeDate.setSeconds(0);
    range.from = fromTimeDate;

    // generate new Date() end time from range.to and toTime
    const toTimeSplit = toTime.split(":");
    const toTimeDate = new Date(range.to?.toString());
    toTimeDate.setHours(parseInt(toTimeSplit[0]));
    toTimeDate.setMinutes(parseInt(toTimeSplit[1]));
    toTimeDate.setSeconds(0);
    range.to = toTimeDate;

    setSaving(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/${
          isUpdate ? "update" : "create"
        }`,
        {
          id: isUpdate ? updateID : "",
          name,
          desc: description,
          passingPercentage: passingPercentage,
          languages: languages,
          instructions,
          duration: timeLimit,
          openRange: {
            start: range.from,
            end: range.to,
          },
          questions,
          access,
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
            fullScreenExitDetection,
          },
          feedback: {
            email: feedbackEmail,
            phone: feedbackPhone,
          },
        }
      )
      .then((res) => {
        toast.success(
          `Screening ${isUpdate ? "updated" : "created"} successfully`
        );
        setSaving(false);

        if (!isUpdate) {
          setLink(res.data.link);
          setShowCode(true);
        } else {
          navigate("/screenings");
        }
      })
      .catch(() => {
        toast.error(`Error ${isUpdate ? "updating" : "creating"} screening`);
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
              passingPercentage={passingPercentage}
              setPassingPercentage={setPassingPercentage}
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
              fullScreenExitDetection={fullScreenExitDetection}
              setFullScreenExitDetection={setFullScreenExitDetection}
              selectedLanguages={languages}
              setSelectedLanguages={setLanguages}
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
                      navigator.clipboard.writeText(
                        `${import.meta.env.VITE_FRONTEND_ADDRESS}/r/${link}`
                      );
                      toast.success("Link copied to clipboard");
                    }}
                  />
                </p>
                <Button
                  onClick={() => (window.location.href = "/screenings")}
                  className="mt-5"
                >
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
