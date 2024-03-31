import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import starterGenerator from "@/functions/StarterGenerator";
import CodeMirror, { oneDark } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";

const StubComponenent = ({
  requestNext,
  respondNext,
  data,
  goBack,
}: {
  requestNext: boolean;
  respondNext: (
    allowed: boolean,
    data: {
      functionName: string;
      returnType: "int" | "string" | "float" | "double" | "char" | "boolean";
      args: {
        key: string;
        type: "int" | "string" | "float" | "double" | "char" | "boolean";
      }[];
    }
  ) => void;
  data: {
    functionName: string;
    returnType: "int" | "string" | "float" | "double" | "char" | "boolean";
    args: {
      key: string;
      type: "int" | "string" | "float" | "double" | "char" | "boolean";
    }[];
  };
  goBack: () => void;
}) => {
  useEffect(() => {
    if (requestNext) {
      goToNext();
    }
  }, [requestNext]);

  useEffect(() => {
    if (data) {
      setFunctionName(data.functionName);
      setReturnType(data.returnType);
      setArgs(data.args);
    }
  }, [data]);

  const goToNext = (): boolean => {
    if (verifyFields()) {
      const data = {
        functionName,
        returnType,
        args,
      };
      respondNext(true, data);
      return true;
    }
    respondNext(false, null as any);
    return false;
  };

  const verifyFields = (): boolean => {
    if (!functionName || !returnType || !args.length) return false;
    if (args.some((arg) => !arg.key || !arg.type)) return false;
    return true;
  };

  const [args, setArgs] = useState<
    {
      key: string;
      type: "int" | "string" | "float" | "double" | "char" | "boolean";
    }[]
  >([]);

  const [open, setOpen] = useState(false);
  const [functionName, setFunctionName] = useState("");
  const [returnType, setReturnType] = useState<
    "int" | "string" | "float" | "double" | "char" | "boolean"
  >("int");

  const [language, setLanguage] = useState("javascript");
  const [stub, setStub] = useState("");

  useEffect(() => {
    const genStub = starterGenerator(language, functionName, returnType, args);
    setStub(genStub);
  }, [language, functionName, returnType, args]);

  const showPreview = () => {
    setOpen(true);
    const genStub = starterGenerator(language, functionName, returnType, args);
    setStub(genStub);
  };

  return (
    <div className="w-full">
      <div className=" overflow-y-auto h-[65vh]">
        <h5>Code Stub</h5>
        <div className="flex gap-10 mt-5 items-center">
          <div>
            <p>
              Function Name <span className=" text-red-500">*</span>
            </p>
            <Input
              placeholder="Function name"
              className="w-[300px] mt-3"
              value={functionName}
              onChange={(e) => setFunctionName(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-3">Function Return Type</p>
            <Select
              onValueChange={(value) => setReturnType(value as any)}
              value={returnType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Return Type &nbsp;" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="int">int</SelectItem>
                <SelectItem value="string">string (or array)</SelectItem>
                <SelectItem value="float">float</SelectItem>
                <SelectItem value="double">double</SelectItem>
                <SelectItem value="char">char</SelectItem>
                <SelectItem value="boolean">boolean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Button
            className="mt-5"
            variant="link"
            onClick={() =>
              setArgs((prev) => [...prev, { key: "", type: "int" }])
            }
          >
            Add Argument
          </Button>
          {args.map((_arg, index) => (
            <div key={index} className="flex gap-5 mt-5 items-center">
              <Input
                placeholder="Argument Name"
                className="w-[500px]"
                value={_arg.key}
                onChange={(e) => {
                  const value = e.target.value;
                  setArgs((prev) =>
                    prev.map((arg, i) =>
                      i === index ? { ...arg, key: value } : arg
                    )
                  );
                }}
              />
              <Select
                onValueChange={(value) =>
                  setArgs((prev) =>
                    prev.map((arg, i) =>
                      i === index ? { ...arg, type: value as any } : arg
                    )
                  )
                }
                value={_arg.type}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select an DataType &nbsp;" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="int">int</SelectItem>
                  <SelectItem value="string">string (or array)</SelectItem>
                  <SelectItem value="float">float</SelectItem>
                  <SelectItem value="double">double</SelectItem>
                  <SelectItem value="char">char</SelectItem>
                  <SelectItem value="boolean">boolean</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="link"
                className="text-red-500"
                onClick={() =>
                  setArgs((prev) => prev.filter((_, i) => i !== index))
                }
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="float-end">
        <Button className="mt-5 mr-5" variant="outline" onClick={showPreview}>
          Preview
        </Button>
        <Button className="mt-5 mr-5" onClick={() => goBack()}>
          Back
        </Button>
        <Button className="mt-5" onClick={goToNext}>
          Save
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Code Stub</DialogTitle>
            <DialogDescription>
              <Select
                onValueChange={(value) => setLanguage(value)}
                value={language}
              >
                <SelectTrigger className="mt-5">
                  <SelectValue placeholder="Select Language &nbsp;" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>

              <CodeMirror
                className="mt-5"
                value={stub}
                extensions={
                  language === "javascript"
                    ? [javascript({ jsx: true })]
                    : language === "python"
                    ? [python()]
                    : language === "java"
                    ? [java()]
                    : language === "c"
                    ? [cpp()]
                    : language === "cpp"
                    ? [cpp()]
                    : []
                }
                theme={oneDark}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StubComponenent;
