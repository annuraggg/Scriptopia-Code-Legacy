import DetailsComponent from "./DetailsComponent";
import SelectLanguage from "./SelectLanguage";
import StubComponent from "./StubComponent";
import AddCase from "./AddCase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Delta } from "quill/core";
import { Case } from "@/types/TestCase";
import QualityGate from "./QualityGate";
import { z } from "zod";
import Problem from "@/types/Problem";

const CreateProblem = ({ question }: { question: Problem }) => {
  const [active, setActive] = useState(0);

  // * States for DetailsComponent
  const [questionName, setQuestionName] = useState<string>("");
  const [isPrivate] = useState<boolean>(true);
  const [useAllowed] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [recommendedTime, setRecommendedTime] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<Delta>({} as Delta);

  // * States for SelectLanguage
  const [languages, setLanguages] = useState<string[]>([]);

  // * States for StubComponent
  const [functionName, setFunctionName] = useState<string>("");
  const [returnType, setReturnType] = useState<string>("");
  const [functionArgs, setFunctionArgs] = useState<
    { key: string; type: number | boolean | string | never[] }[]
  >([]);

  // * States for AddCase
  const [testCases, setTestCases] = useState<Case[]>([]);

  useEffect(() => {
    if (question) {
      setQuestionName(question.title);
      setDifficulty(question.difficulty as "easy" | "medium" | "hard");
      setRecommendedTime(question.recommendedTime);
      setTags(question.tags);
      setDescription(question.description as Delta);
      setLanguages(question.languageSupport);
      setFunctionName(question.starterFunction);
      setReturnType(question.functionReturn);
      setFunctionArgs(question.starterVarArgs);
      setTestCases(question.testCases);
    }
  }, [question]);

  const submit = () => {
    const schema = z.object({
      name: z.string(),
      time: z.number(),
      difficulty: z.string(),
      tags: z.array(z.string()),
      description: z.any(),
      selectedLanguages: z.array(z.string()),
      functionName: z.string(),
      returnType: z.string(),
      args: z.array(z.object({ key: z.string(), type: z.any() })),
      testCases: z.array(z.any()),
      isPrivate: z.boolean(),
      allowInterview: z.boolean(),
    });

    const data = {
      name: questionName,
      time: recommendedTime,
      difficulty: difficulty,
      tags: tags,
      description: description,
      selectedLanguages: languages,
      functionName: functionName,
      returnType: returnType,
      args: functionArgs,
      testCases: testCases,
      isPrivate: isPrivate,
      allowInterview: useAllowed,
    };

    console.log(data);

    const validatedData = schema.parse(data);

    console.log(validatedData);
  };

  const steps: { title: string; component?: JSX.Element }[] = [
    {
      title: "Question Details",
      component: (
        <DetailsComponent
          questionName={questionName}
          setQuestionName={setQuestionName}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          recommendedTime={recommendedTime}
          setRecommendedTime={setRecommendedTime}
          tags={tags}
          setTags={setTags}
          description={description}
          setDescription={setDescription}
          isPrivate={isPrivate}
          useAllowed={useAllowed}
        />
      ),
    },
    {
      title: "Languages",
      component: (
        <SelectLanguage
          selectedLanguages={languages}
          setSelectedLanguages={setLanguages}
        />
      ),
    },
    {
      title: "Code Stub",
      component: (
        <StubComponent
          functionName={functionName}
          setFunctionName={setFunctionName}
          returnType={returnType}
          setReturnType={setReturnType}
          args={functionArgs}
          setArgs={setFunctionArgs}
        />
      ),
    },
    {
      title: "Test Cases",
      component: (
        <AddCase
          testCases={testCases}
          setTestCases={setTestCases}
          args={functionArgs}
        />
      ),
    },
    {
      title: "Quality Gate",
      component: (
        <QualityGate
          tags={tags}
          statement={description}
          testCases={testCases}
          isPublic={!isPrivate}
          submit={submit}
        />
      ),
    },
  ];

  const goToTab = (index: number) => {
    setActive(index);
  };

  const goToNext = () => {
    if (active < steps.length - 1) {
      setActive(active + 1);
    }
  };

  return (
    <>
      <div className="px-10">
        <div className="w-full">
          <div className="bg-background border rounded-t-lg p-2 px-5 flex items-center justify-between">
            {steps[active].title}
            <div className="flex gap-2">
              {active > 0 && (
                <Button variant="secondary" onClick={() => goToTab(active - 1)}>
                  Previous
                </Button>
              )}
              {active < steps.length - 1 && (
                <Button variant="secondary" onClick={goToNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
          <div className="border p-10 py-5 rounded-b-lg w-full overflow-y-auto h-[75vh]">
            {steps[active].component}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProblem;
