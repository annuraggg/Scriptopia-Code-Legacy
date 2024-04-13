import ReactCodeMirror, { oneDark } from "@uiw/react-codemirror";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { javascript, javascriptLanguage } from "@codemirror/lang-javascript";
import { python, pythonLanguage } from "@codemirror/lang-python";
import { java, javaLanguage } from "@codemirror/lang-java";

const CodeEditor = ({
  languages,
  paste,
  setPaste,
  autocomplete,
  syntaxHighlighting,

  code,
  setCode,
  selectedLang,
  setSelectedLang,
}: {
  languages: string[];
  paste: number;
  setPaste: (value: number) => void;
  autocomplete: boolean;
  syntaxHighlighting: boolean;

  code: string;
  setCode: (value: string) => void;
  selectedLang: string;
  setSelectedLang: (value: string) => void;
}) => {
  const extension = (lang: string) => {
    if (autocomplete) {
      switch (lang) {
        case "javascript":
          return javascript({ jsx: true });
        case "python":
          return python();
        case "java":
          return java();
        default:
          return javascript({ jsx: true });
      }
    } else {
      switch (lang) {
        case "javascript":
          return javascriptLanguage;
        case "python":
          return pythonLanguage;
        case "java":
          return javaLanguage;
        default:
          return javascriptLanguage;
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detectPaste = (event: any) => {
    const currentPaste = event?.clipboardData?.getData("text/plain");
    const lastCopy = localStorage?.getItem("lastCopy");

    if (lastCopy !== currentPaste) {
      setPaste(paste + 1);
    }
  };

  const copyText = (
    e:
      | React.ClipboardEvent<HTMLDivElement>
      | React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    const lastCopy = e?.clipboardData?.getData("text/plain");
    localStorage?.setItem("lastCopy", lastCopy);
  };

  return (
    <div className="w-[48vw] overflow-y-auto rounded rounded-tr-none rounded-br-none relative">
      <div className="bg-secondary p-3 rounded-tl-none flex justify-between items-center sticky">
        <p>Statement</p>
        <div className="flex items-center gap-5">
          <p className="text-xs">Language: </p>
          <Select value={selectedLang} onValueChange={setSelectedLang}>
            <SelectTrigger className="w-[180px] border-gray-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages?.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang?.charAt(0)?.toUpperCase() + lang?.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className=" h-full bg-[#282C34] ">
        <ReactCodeMirror
          value={code}
          theme={oneDark}
          // @ts-expect-error - CodeMirror types are not up to date
          extensions={syntaxHighlighting ? extension(selectedLang) : []}
          onPasteCapture={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (event: any) => detectPaste(event)
          }
          onCopy={copyText}
          onChange={(value) => setCode(value)}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
