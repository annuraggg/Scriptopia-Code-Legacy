import { Navbar } from "@/components/ui/navbar";
import { cloneElement, useEffect, useState } from "react";
import DetailsComponent from "./DetailsComponent";
import SelectLanguage from "./SelectLanguage";
import StubComponenent from "./StubComponenent";
import AddCase from "./AddCase";
import { toast } from "sonner";
import axios from "axios";

const CreateProblem = ({
  addQuest,
  currQuest,
  allQuestions,
}: {
  addQuest: (question: any) => void;
  currQuest: any;
  allQuestions: any[];
}) => {
  useEffect(() => {
    if (currQuest) {
      setName(currQuest.title);
      setTime(currQuest.recommendedTime);
      setDifficulty(currQuest.difficulty);
      setTags(currQuest.tags);
      setDescription(currQuest.description);
      setSelectedLanguages(currQuest.languageSupport);
      setFunctionName(currQuest.starterFunction);
      setReturnType(currQuest.functionReturn);
      setArgs(currQuest.starterVarArgs);
      setTestCases(currQuest.testCases);
    }
  }, [currQuest]);

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

  const [saving, setSaving] = useState<boolean>(false);

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
      name: string;
      difficulty: "easy" | "medium" | "hard";
      score: number;
      input: string[];
      output: string;
      isSample: boolean;
    }[]
  >([]);

  useEffect(() => {
    const isEdit = window.location.pathname.includes("edit");
    if (isEdit) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_ADDRESS}/problems/edit/${
            window.location.pathname.split("/")[2]
          }`
        )
        .then((res) => {
          const { desc, meta, cases, func, args } = res.data;
          setName(meta.title);
          setTime(meta.time);
          setDifficulty(meta.difficulty);
          setTags(meta.tags);
          setDescription(desc);
          setSelectedLanguages(meta.langs);
          setFunctionName(func);
          setReturnType("int");
          setArgs(args);
          setTestCases(cases);
        });
    }
  }, []);

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

  const goBack = () => {
    setActive(active - 1);
  };

  const checkDuplicate = (allQuestions: any) => {
    const currFields = {
      title: name,
      recommendedTime: time,
      difficulty,
      tags,
      description,
      languageSupport: selectedLanguages,
      starterFunction: functionName,
      functionReturn: returnType,
      starterVarArgs: args,
      testCases,
    };

    console.log(currFields);
    console.log(allQuestions);

    // check if all fields are same
    for (let i = 0; i < allQuestions.length; i++) {
      const question = allQuestions[i];
      if (
        question.title === currFields.title &&
        question.recommendedTime === currFields.recommendedTime &&
        question.difficulty === currFields.difficulty &&
        question.tags === currFields.tags &&
        question.description === currFields.description &&
        question.languageSupport === currFields.languageSupport &&
        question.starterFunction === currFields.starterFunction &&
        question.functionReturn === currFields.functionReturn &&
        question.starterVarArgs === currFields.starterVarArgs &&
        question.testCases === currFields.testCases
      ) {
        return true;
      }
    }

    return false;
  };

  const submit = (allowed: boolean, data: any) => {
    setSaving(true);

    if (allowed) {
      saveData(data);

      if (checkDuplicate(allQuestions)) {
        toast.error("Duplicate question", {
          position: "top-center",
        });
        setSaving(false);
        return;
      }

      addQuest({
        title: name,
        _id: "",
        difficulty,
        tags,
        time,
        name,
        description,
        selectedLanguages,
        functionName,
        returnType,
        args,
        testCases: data,
        isPrivate: true,
      });

      setName("");
      setTime("");
      setDifficulty("easy");
      setTags([]);
      setDescription("");
      setSelectedLanguages([]);
      setFunctionName("");
      setReturnType("int");
      setArgs([]);
      setTestCases([]);

      setActive(0);
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
          goBack={goBack}
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
          goBack={goBack}
        />
      ),
    },
    {
      title: "Test Cases",
      component: (
        <AddCase
          respondNext={submit}
          data={testCases}
          args={args}
          saving={saving}
          goBack={goBack}
        />
      ),
    },
  ];

  return (
    <>
      <div className="px-5 h-[77vh] overflow-y-auto">
        {cloneElement(steps[active].component!, {
          requestNext: requestNext,
          responseNext: goToNext,
        })}
      </div>
    </>
  );
};

export default CreateProblem;
