import { Navbar } from "@/components/ui/navbar";
import { cloneElement, useState } from "react";
import DetailsComponent from "./DetailsComponent";
import SelectLanguage from "./SelectLanguage";
import StubComponenent from "./StubComponenent";
import AddCase from "./AddCase";
import { toast } from "sonner";

const CreateProblem = () => {
  const [active, setActive] = useState(0);
  const [requestNext, setRequestNext] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [functionName, setFunctionName] = useState<string>("");
  const [returnType, setReturnType] = useState<
    "int" | "string" | "float" | "double" | "char" | "boolean"
  >("int");
  const [args, setArgs] = useState<
    {
      key: string;
      type: "int" | "string" | "float" | "double" | "char" | "boolean";
    }[]
  >([]);

  const [testCases, setTestCases] = useState<
    {
      caseName: string;
      difficulty: "easy" | "medium" | "hard";
      score: number;
      input: string;
      output: string;
      isSample: boolean;
    }[]
  >([]);

  const goToTab = (index: number) => {
    if (index === active) return;
    if (index < active) {
      setActive(index);
      return;
    }
    setRequestNext(true);
  };

  const saveData = (data: any) => {
    if (active === 0) {
      setName(data.name);
      setTime(data.time);
      setDifficulty(data.difficulty);
      setTags(data.tags);
      setDescription(data.description);
    } else if (active === 1) {
      setSelectedLanguages(data);
    } else if (active === 2) {
      setFunctionName(data.functionName);
      setReturnType(data.returnType);
      setArgs(data.args);
    } else if (active === 3) {
      setTestCases(data);
    }
  };

  const goToNext = (allowed?: boolean, data?: any) => {
    setRequestNext(false);
    if (allowed) {
      saveData(data);
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields", {
        position: "top-center",
      });
    }
  };

  // ! PROCESS THE DATA AND SUBMIT
  const submit = (allowed: boolean, data: any) => {
    if (allowed) {
      saveData(data);
      toast.success("Problem Created Successfully", {
        position: "top-center",
      });
    } else {
      toast.error("Please fill all the fields", {
        position: "top-center",
      });
    }
  };

  const steps: { title: string; component?: JSX.Element }[] = [
    {
      title: "Question Details",
      component: (
        <DetailsComponent
          respondNext={goToNext}
          requestNext={requestNext}
          data={{ name, time, difficulty, tags, description }}
        />
      ),
    },
    {
      title: "Languages",
      component: (
        <SelectLanguage
          respondNext={goToNext}
          requestNext={requestNext}
          data={selectedLanguages}
        />
      ),
    },
    {
      title: "Code Stub",
      component: (
        <StubComponenent
          respondNext={goToNext}
          requestNext={requestNext}
          data={{ functionName, returnType, args }}
        />
      ),
    },
    {
      title: "Test Cases",
      component: (
        <AddCase
          respondNext={submit}
          data={testCases}
        />
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="px-10 py-5">
        <h2>Create Problem</h2>
        <div className="flex mt-5 gap-10">
          <div className="flex mt-5 gap-5 flex-col">
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
          {cloneElement(steps[active].component!, {
            requestNext: requestNext,
            responseNext: goToNext,
          })}
        </div>
      </div>
    </>
  );
};

export default CreateProblem;
