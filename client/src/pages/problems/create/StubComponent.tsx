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
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import ReactCodeMirror, { oneDark } from "@uiw/react-codemirror";

const StubComponent = () => {
  const [functionName, setFunctionName] = useState<string>("");
  const [returnType, setReturnType] = useState<string>("");

  const [args, setArgs] = useState<{ key: string; type: string }[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("javascript");
  const [stub, setStub] = useState<string>("");

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
      <p>Function Definition</p>
      <div className="flex mt-3 gap-5">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs">
            Function Name <span className="text-red-500">*</span>
          </p>
          <Input placeholder="Enter function name" className="w-full" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs">
            Function Return Type <span className="text-red-500">*</span>
          </p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Return Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="array">Array</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex gap-3 items-center">
          <p>Function Arguments</p>
          <Button
            onClick={() =>
              setArgs((prev) => [...prev, { key: "", type: "string" }])
            }
            className=" ml-10"
            variant="outline"
          >
            Add Argument
          </Button>

          <Button
            onClick={() => setArgs([])}
            variant="outline"
            className="text-red-500"
          >
            Remove All
          </Button>

          <Button onClick={showPreview}>Generate Stub</Button>
        </div>

        <div className="mt-5">
          {args.map((arg, index) => (
            <div key={index} className="flex gap-5 mt-5 items-center">
              <Input
                placeholder="Argument Name"
                className="w-full"
                value={arg.key}
                onChange={(e) => {
                  const value = e.target.value;
                  setArgs((prev) =>
                    prev.map((arg, i) =>
                      i === index ? { ...arg, key: value } : arg
                    )
                  );
                }}
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() =>
                  setArgs((prev) => prev.filter((_, i) => i !== index))
                }
                variant="destructive"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
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

              <ReactCodeMirror
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

export default StubComponent;
