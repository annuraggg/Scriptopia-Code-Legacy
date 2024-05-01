import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

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

const Security = ({
  codePlaybacks,
  setCodePlaybacks,
  tabChangeDetection,
  setTabChangeDetection,
  gptDetection,
  setGptDetection,
  copyPasteDetection,
  setCopyPasteDetection,
  plagiarismDetection,
  setPlagiarismDetection,
  fullScreenExitDetection,
  setFullScreenExitDetection,
  selectedLanguages,
  setSelectedLanguages,
}: {
  codePlaybacks: boolean;
  setCodePlaybacks: (codePlaybacks: boolean) => void;
  tabChangeDetection: boolean;
  setTabChangeDetection: (tabChangeDetection: boolean) => void;
  gptDetection: boolean;
  setGptDetection: (gptDetection: boolean) => void;
  copyPasteDetection: boolean;
  setCopyPasteDetection: (copyPasteDetection: boolean) => void;
  plagiarismDetection: boolean;
  setPlagiarismDetection: (plagiarismDetection: boolean) => void;
  fullScreenExitDetection: boolean;
  setFullScreenExitDetection: (fullScreenExitDetection: boolean) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (selectedLanguages: string[]) => void;
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const selectAllCall = (e: boolean) => {
    setSelectAll(e);
    setCodePlaybacks(e);
    setTabChangeDetection(e);
    setGptDetection(e);
    setCopyPasteDetection(e);
    setPlagiarismDetection(e);
    setFullScreenExitDetection(e);
  };

  useEffect(() => {
    if (
      codePlaybacks &&
      tabChangeDetection &&
      gptDetection &&
      copyPasteDetection &&
      plagiarismDetection
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [
    codePlaybacks,
    tabChangeDetection,
    gptDetection,
    copyPasteDetection,
    plagiarismDetection,
  ]);

  return (
    <div className="flex gap-5 justify-around mt-10">
      <div className="w-[50%] px-5">
        <h2>Security</h2>

        <div className="mt-10 flex gap-5 items-center">
          <Checkbox
            onCheckedChange={(e: boolean) => selectAllCall(e)}
            checked={selectAll}
          />
          <p>Select All</p>
        </div>

        <Separator className="my-5" />

        <div className="mt-5 flex gap-5 items-center">
          <Checkbox
            checked={codePlaybacks}
            onCheckedChange={() => setCodePlaybacks(!codePlaybacks)}
          />
          <p>Enable Code Playback</p>
        </div>

        <div className="mt-5 flex gap-5 items-center">
          <Checkbox
            checked={tabChangeDetection}
            onCheckedChange={() => setTabChangeDetection(!tabChangeDetection)}
          />
          <p>Enable Tab Change Detection</p>
        </div>

        <div className="mt-5 flex gap-5 items-center">
          <Checkbox
            checked={copyPasteDetection}
            onCheckedChange={() => setCopyPasteDetection(!copyPasteDetection)}
          />
          <p>Enable Copy / Paste Detection</p>
        </div>

        <div className="mt-5 flex gap-5 items-center">
          <Checkbox
            checked={fullScreenExitDetection}
            onCheckedChange={() =>
              setFullScreenExitDetection(!fullScreenExitDetection)
            }
          />
          <p>Enable Fullscreen Exit Detection</p>
        </div>
      </div>

      <div className="w-[0.5px] h-[75vh] bg-primary-foreground"></div>

      <div className="w-[50%] px-5">
        <h5>Select Languages</h5>
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
                    setSelectedLanguages([
                      ...selectedLanguages,
                      language.value,
                    ]);
                  } else {
                    setSelectedLanguages(
                      selectedLanguages.filter(
                        (lang) => lang !== language.value
                      )
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
      </div>
    </div>
  );
};

export default Security;
