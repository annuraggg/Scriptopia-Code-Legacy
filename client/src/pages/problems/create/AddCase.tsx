import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Case } from "@/types/TestCase";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import papa from "papaparse";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AddCase = ({
  args,
  testCases,
  setTestCases,
}: {
  args: {
    key: string;
    type: string | number | boolean | never[];
  }[];
  testCases: Case[];
  setTestCases: (value: Case[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isBulkAddOpen, setIsBulkAddOpen] = useState(false);

  const [caseName, setCaseName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [score, setScore] = useState(0);
  const [input, setInput] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [isSample, setIsSample] = useState(false);

  const [inputCaseArray, setInputCaseArray] = useState<string>("");
  const [outputCaseArray, setOutputCaseArray] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);

  const parseData = (inputString: string) => {
    try {
      inputString = inputString.substring(1, inputString.length - 2);

      const seperatedCases = inputString.split("],[");
      const finalCases: string[] = [];

      seperatedCases.forEach((element) => {
        element = "[" + element + "]";
        let parsedArr = JSON.parse(element);
        parsedArr = parsedArr.map(
          (item: string | number | boolean | object) => {
            if (typeof item === "string") {
              return item;
            } else {
              return JSON.stringify(item);
            }
          }
        );
        inputString = inputString.substring(1, inputString.length - 2);

        const seperatedCases = inputString.split("],[");
        const finalCases: string[] = [];

        seperatedCases.forEach((element) => {
          element = "[" + element + "]";
          let parsedArr = JSON.parse(element);
          parsedArr = parsedArr.map(
            (item: string | number | boolean | object) => {
              if (typeof item === "string") {
                return item;
              } else {
                return JSON.stringify(item);
              }
            }
          );

          return finalCases.push(parsedArr);
        });

        return finalCases;

        return finalCases.push(parsedArr);
      });

      return finalCases;
    } catch (error) {
      toast.error("Invalid Input Array");
      return [];
    }
  };

  const parseOutput = (outputString: string) => {
    try {
      let finalStr = JSON.parse(outputString);

      if (finalStr.some((item: unknown) => typeof item === "object")) {
        finalStr = finalStr.map((item: unknown) => {
          if (typeof item === "object") {
            return JSON.stringify(item);
          } else {
            return item;
          }
        });
      }

      return finalStr;
    } catch (error) {
      toast.error("Invalid Output Array");
      return [];
    }
  };

  const bulkAdd = () => {
    const outputArray = parseOutput(outputCaseArray);
    const inputArray = parseData(inputCaseArray);

    if (inputArray.length !== outputArray.length) {
      toast.error("Input and Output Array length should be same");
      return;
    }
    const cases = inputArray.map((item, index) => {
      return {
        name: `Case ${index + 1}`,
        difficulty,
        score,
        input: [...item], // Ensure input is always an array
        output: outputArray[index],
        isSample: index < 3 ? true : false,
      };
    });

    setTestCases([...testCases, ...cases]);
    setIsBulkAddOpen(false);
    setInputCaseArray("");
    setOutputCaseArray("");
  };

  const deleteCase = (index: number) => {
    const newCases = testCases.filter((_, i) => i !== index);
    setTestCases(newCases);
  };

  const editCase = (index: number) => {
    setIsEditing(true);
    const item = testCases[index];
    setCaseName(item.name);
    setDifficulty(item.difficulty);
    setScore(item.score);
    setInput(item.input);
    setOutput(item.output);
    setIsSample(item.isSample);
    
    setOpen(true);
  };

  const setCaseArg = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = e.target.value;
    const current = [...input];
    current[index] = value;
    setInput(current);
  };

  const saveCase = () => {
    if(isEditing) {
      const newCases = testCases.map((item, index) => {
        if(index === testCases.length - 1) {
          return {
            name: caseName,
            difficulty,
            score,
            input,
            output,
            isSample,
          }
        }
        return item;
      });
      setTestCases(newCases);
      setOpen(false);
      setIsEditing(false);
      setCaseName("");
      setDifficulty("easy");
      setScore(0);
      setInput([]);
      setOutput("");
      setIsSample(false);
      return;
    }

    if (caseName && difficulty && score && input && output) {
      setTestCases([
        ...testCases,
        {
          name: caseName,
          difficulty,
          score,
          input,
          output,
          isSample,
        },
      ]);
      setOpen(false);
      setCaseName("");
      setDifficulty("easy");
      setScore(0);
      setInput([]);
      setOutput("");
      setIsSample(false);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  const selectFile = () => {
    const fileInput: HTMLInputElement | null =
      document.querySelector("input[type='file']");
    fileInput?.click();
  };

  const parseFile = (file: File | undefined) => {
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result;
          const result = papa.parse(text as string, { header: true });
          console.log(result);
          const cases = result.data.map(
            // @ts-expect-error - Type mismatch
            (item: {
              name: string;
              difficulty: string;
              score: number;
              input: string;
              output: string;
              isSample: string;
            }) => {
              console.log(item);
              return {
                name: item.name,
                difficulty: item.difficulty,
                score: item.score,
                input: item.input.split(",").map((arg: string) => arg.trim()),
                output: item.output,
                isSample: item.isSample === "true" ? true : false,
              };
            }
          );
          setTestCases([...testCases, ...cases]);
        };
        reader.readAsText(file);
      } catch (error) {
        toast.error("Invalid File");
      }
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        <Button variant="link" onClick={() => setOpen(true)}>
          Add Case
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button>Import From CSV</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll max-h-screen">
            <AlertDialogHeader>
              <AlertDialogTitle>
                The CSV should be in the following format
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p>It should Include the Following Columns</p>
                <p>name, difficulty, score, input, output, isSample</p>

                <p className="mt-5 mb-2">
                  <strong>Sample CSV</strong>
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>name</TableHead>
                      <TableHead>difficulty</TableHead>
                      <TableHead>score</TableHead>
                      <TableHead>input</TableHead>
                      <TableHead>output</TableHead>
                      <TableHead>isSample</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Case 1</TableCell>
                      <TableCell>easy</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>1, 2</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>true</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Case 2</TableCell>
                      <TableCell>medium</TableCell>
                      <TableCell>20</TableCell>
                      <TableCell>2, 3</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>false</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={selectFile}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <input
          type="file"
          onChange={(e) => parseFile(e.target.files?.[0])}
          className="hidden"
        />
        <Button onClick={() => setIsBulkAddOpen(true)}>Place as Array</Button>
      </div>

      <div className="h-[50vh] overflow-y-auto">
        <Table className="w-[70vw] mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>Case No.</TableHead>
              <TableHead>Case Name</TableHead>
              <TableHead>Input</TableHead>
              <TableHead>Output</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>isSample</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testCases.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.input.length > 0
                    ? item.input.map((arg, i) => (
                        <p key={i}>
                          {arg} {i !== item.input.length - 1 ? "," : ""}
                        </p>
                      ))
                    : "No Arguments"}
                </TableCell>
                <TableCell>{item.output}</TableCell>
                <TableCell>{item.difficulty}</TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.isSample ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button variant="link" onClick={() => editCase(index)}>
                    Edit
                  </Button>
                  <Button variant="link" onClick={() => deleteCase(index)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Test Case</DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="mt-5">
                  <p>
                    Case Name <span className="text-red-500 mt-5">*</span>
                  </p>
                  <Input
                    placeholder="Enter case name"
                    className="mt-3"
                    value={caseName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCaseName(e.target.value)
                    }
                  />
                </div>
                <div className="flex mt-5 gap-5 justify-center">
                  <div>
                    <p>Difficulty</p>
                    <Select
                      onValueChange={(e: string) => setDifficulty(e)}
                      value={difficulty}
                    >
                      <SelectTrigger className="w-[220px] mt-3">
                        <SelectValue placeholder="easy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <p>Score</p>
                    <Input
                      placeholder="Enter score"
                      className="mt-3 w-[220px]"
                      type="number"
                      value={score}
                      onChange={(e) => setScore(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5 mt-5 items-start justify-center">
                  <p>Input</p>
                  {args?.length > 0 ? (
                    <>
                      {args?.map((item, index: number) => (
                        <div
                          className="flex gap-3 justify-center items-center w-full"
                          key={item.key}
                        >
                          <p>{item.key}</p>
                          <Input
                            placeholder={`Enter ${item.key}`}
                            className="w-full"
                            value={input[index]}
                            onChange={(e) => setCaseArg(e, index)}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    "No Arguments Found"
                  )}

                  <div>
                    <p>Output</p>
                    <Textarea
                      className="w-[450px] mt-3"
                      value={output}
                      onChange={(e) => setOutput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <Checkbox
                    checked={isSample}
                    disabled={
                      testCases.filter((item) => item.isSample).length >= 3
                    }
                    onCheckedChange={() => setIsSample(!isSample)}
                  />
                  <p>
                    Is a Sample Test Case?{" "}
                    <span className="text-red-500">*</span>
                  </p>
                </div>
              </div>
            </DialogDescription>
            <DialogFooter>
              <Button
                className="mt-5"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button className="mt-5" onClick={saveCase}>
                Save
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isBulkAddOpen} onOpenChange={setIsBulkAddOpen}>
        <DialogContent className="overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>
              Place the Array of cases as plain text here
            </DialogTitle>
            <DialogDescription asChild>
              <div className="">
                <Textarea
                  className="mt-5 h-[100px]"
                  placeholder="Enter Input Array here"
                  value={inputCaseArray}
                  onChange={(e) => setInputCaseArray(e.target.value)}
                />

                <Textarea
                  className="mt-5 h-[100px]"
                  placeholder="Enter Output Array here"
                  value={outputCaseArray}
                  onChange={(e) => setOutputCaseArray(e.target.value)}
                />

                <div className="flex mt-5 gap-5 justify-center">
                  <div>
                    <p>Difficulty</p>
                    <Select
                      onValueChange={(e: string) => setDifficulty(e)}
                      value={difficulty}
                    >
                      <SelectTrigger className="w-[220px] mt-3">
                        <SelectValue placeholder="easy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <p>Score</p>
                    <Input
                      placeholder="Enter score"
                      className="mt-3 w-[220px]"
                      type="number"
                      value={score}
                      onChange={(e) => setScore(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <Button className="mt-5 float-right mr-2" onClick={bulkAdd}>
                  Save
                </Button>
                <Button
                  className="mt-5 mr-2 float-right"
                  variant="secondary"
                  onClick={() => setIsBulkAddOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCase;
