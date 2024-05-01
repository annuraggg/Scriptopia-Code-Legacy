import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { useTheme } from "@/components/theme-provider";

const CodeEditor = ({
  code,
  explainCode,
}: {
  code: string;
  explainCode: (code: string) => void;
}) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(code);
  }, [code]);

  const generateSummary = () => {
    explainCode(value);
  };

  const { theme } = useTheme();

  return (
    <div className="overflow-y-auto rounded w-full">
      <div className="bg-secondary rounded-t sticky z-50 top-0 border p-1 px-7 text-gray-400 flex justify-between">
        <div className="flex items-center justify-center">
          <p>JavaScript</p>
          <Button className="ml-3" variant="link" onClick={generateSummary}>
            <BsStars size={12} />
            <p className="text-xs ml-2">Explain Code</p>
          </Button>
        </div>
      </div>
      <CodeMirror
        readOnly={true}
        className="rounded-1xl"
        value={value}
        height="70vh"
        extensions={[javascript({ jsx: true })]}
        theme={theme as "dark" | "light"}
      />
    </div>
  );
};

export default CodeEditor;
