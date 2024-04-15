import { Navbar } from "@/components/ui/navbar";
import DetailsComponent from "./DetailsComponent";
import SelectLanguage from "./SelectLanguage";
import StubComponent from "./StubComponent";
import AddCase from "./AddCase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delta } from "quill/core";
import { Case } from "@/types/TestCase";

const CreateProblem = () => {
  const [active, setActive] = useState(0);

  // * States for DetailsComponent
  const [questionName, setQuestionName] = useState<string>("");
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
      <Navbar />
      <div className="px-10 py-5">
        <h2>Create Problem</h2>
        <div className="flex gap-10">
          <div className="flex flex-col justify-center gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => goToTab(index)}
                className={`cursor-pointer flex items-center gap-5 p-5 rounded-sm bg-secondary bg-opacity-20 w-[250px] border-8 ${
                  active == index
                    ? "border-l-primary opacity-100"
                    : active > index
                    ? "border-l-green-500 opacity-75"
                    : "border-l-secondary opacity-50"
                }`}
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-white">
                  {index + 1}
                </div>
                <div>
                  <p className="text-xs">Step {index + 1}</p>
                  <p className="mt-2">{step.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full">
            <div className="bg-background border rounded-t-lg p-2 px-5 flex items-center justify-between">
              {steps[active].title}
              <div className="flex gap-2">
                {active > 0 && (
                  <Button
                    variant="secondary"
                    onClick={() => goToTab(active - 1)}
                  >
                    Previous
                  </Button>
                )}
                <Button variant="secondary" onClick={goToNext}>
                  Next
                </Button>
              </div>
            </div>
            <div className="border p-10 py-5 rounded-b-lg w-full overflow-y-auto h-[75vh]">
              {steps[active].component}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProblem;
