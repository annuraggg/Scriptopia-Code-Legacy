// @ts-nocheck

import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./General";
import Questions from "./Questions";
import Candidates from "./Candidates";
import Instructions from "./Instructions";
import Scoring from "./Scoring";
import Security from "./Security";
import Feedback from "./Feedback";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const CreateScreening = () => {
  const [tab, setTab] = useState("general");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [timeLimit, setTimeLimit] = useState<number | undefined>(undefined);
  const [allowAutocomplete, setAllowAutocomplete] = useState<boolean>(false);
  const [allowRunCode, setAllowRunCode] = useState<boolean>(false);
  const [allowSyntaxHighlighting, setAllowSyntaxHighlighting] =
    useState<boolean>(false);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");

  const [questions, setQuestions] = useState<any[]>([]);

  const generalObj = {
    name,
    description,
    timeLimit,
    allowAutocomplete,
    allowRunCode,
    allowSyntaxHighlighting,
    range,
    fromTime,
    toTime,
  };

  const nextTab = (currentTab: string, data: any) => {
    const tabs = [
      "general",
      "questions",
      "candidates",
      "instructions",
      "scoring",
      "security",
      "feedback",
    ];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      setTab(tabs[currentIndex + 1]);
    } else {
      setTab("general");
    }

    switch (currentTab) {
      case "general":
        setName(data.name);
        setDescription(data.description);
        setTimeLimit(data.timeLimit);
        setAllowAutocomplete(data.allowAutocomplete);
        setAllowRunCode(data.allowRunCode);
        setAllowSyntaxHighlighting(data.allowSyntaxHighlighting);
        setRange(data.range);
        setFromTime(data.fromTime);
        setToTime(data.toTime);
        break;
      case "questions":
        break;
      case "candidates":
        break;
      case "instructions":
        break;
      case "scoring":
        break;
      case "security":
        break;
      case "feedback":
        break;
    }
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
          <TabsList className="self-center">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="scoring">Scoring</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <General nextTab={nextTab} data={generalObj} />
          </TabsContent>
          <TabsContent value="questions">
            <Questions
              nextTab={nextTab}
              data={questions}
              setData={setQuestions}
            />
          </TabsContent>
          <TabsContent value="candidates">
            <Candidates nextTab={nextTab} />
          </TabsContent>
          <TabsContent value="instructions">
            <Instructions nextTab={nextTab} />
          </TabsContent>
          <TabsContent value="scoring">
            <Scoring nextTab={nextTab} />
          </TabsContent>
          <TabsContent value="security">
            <Security nextTab={nextTab} />
          </TabsContent>
          <TabsContent value="feedback">
            <Feedback nextTab={nextTab} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CreateScreening;
