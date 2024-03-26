import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";

const SelectLanguage = ({
  requestNext,
  respondNext,
  data,
  goBack,
}: {
  requestNext: boolean;
  respondNext: (allowed: boolean, data: string[]) => void;
  data: string[];
  goBack: () => void;
}) => {
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    []
  );

  useEffect(() => {
    if (requestNext) {
      goToNext();
    }
  }, [requestNext]);

  useEffect(() => {
    setSelectedLanguages(data);
  }, []);

  const goToNext = (): boolean => {
    if (verifyFields()) {
      respondNext(true, selectedLanguages);
      return true;
    }
    respondNext(false, []);
    return false;
  };

  const verifyFields = (): boolean => {
    if (selectedLanguages.length === 0) return false;
    return true;
  };

  const languages: {
    name: string;
    value: string;
    isAvailable: boolean;
  }[] = [
    {
      name: "JavaScript",
      value: "javascript",
      isAvailable: true,
    },
    {
      name: "Python",
      value: "python",
      isAvailable: false,
    },
    {
      name: "Java",
      value: "java",
      isAvailable: false,
    },
    {
      name: "C++",
      value: "cpp",
      isAvailable: false,
    },
    {
      name: "C",
      value: "c",
      isAvailable: false,
    },
    {
      name: "C#",
      value: "csharp",
      isAvailable: false,
    },
    {
      name: "Go",
      value: "go",
      isAvailable: false,
    },
    {
      name: "Kotlin",
      value: "kotlin",
      isAvailable: false,
    },
    {
      name: "Ruby",
      value: "ruby",
      isAvailable: false,
    },
    {
      name: "Swift",
      value: "swift",
      isAvailable: false,
    },
    {
      name: "TypeScript",
      value: "typescript",
      isAvailable: false,
    },
    {
      name: "Rust",
      value: "rust",
      isAvailable: false,
    },
    {
      name: "Scala",
      value: "scala",
      isAvailable: false,
    },
    {
      name: "Perl",
      value: "perl",
      isAvailable: false,
    },
    {
      name: "R",
      value: "r",
      isAvailable: false,
    },
    {
      name: "Lua",
      value: "lua",
      isAvailable: false,
    },
    {
      name: "Haskell",
      value: "haskell",
      isAvailable: false,
    },
    {
      name: "Objective-C",
      value: "objective-c",
      isAvailable: false,
    },
    {
      name: "Pascal",
      value: "pascal",
      isAvailable: false,
    },
    {
      name: "VB.NET",
      value: "vbnet",
      isAvailable: false,
    },
    {
      name: "Dart",
      value: "dart",
      isAvailable: false,
    },
    {
      name: "Bash",
      value: "bash",
      isAvailable: false,
    },
    {
      name: "Groovy",
      value: "groovy",
      isAvailable: false,
    },
  ];

  return (
    <div>
      <h5>Select Languages</h5>
      <Input placeholder="Search Languages" className="w-[60vw] mt-5" />
      <div className="mt-5 grid grid-cols-5">
        {languages.map((language) => (
          <div className="mb-5" key={language.value}>
            <Checkbox
              value={language.value}
              key={language.value}
              disabled={!language.isAvailable}
              checked={selectedLanguages.includes(language.value)}
              onCheckedChange={(e) => {
                if (e) {
                  setSelectedLanguages([...selectedLanguages, language.value]);
                } else {
                  setSelectedLanguages(
                    selectedLanguages.filter((lang) => lang !== language.value)
                  );
                }
              }}
            />
            <label
              htmlFor={language.name}
              className={`ml-2 ${!language.isAvailable && " text-gray-500"}`}
            >
              {language.name}
            </label>
          </div>
        ))}
      </div>
      <Button onClick={() => goToNext()} className="float-right">
        Next
      </Button>
      <Button className="mr-5 float-right" onClick={() => goBack()}>
        Back
      </Button>
    </div>
  );
};

export default SelectLanguage;
