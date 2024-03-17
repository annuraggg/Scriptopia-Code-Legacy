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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const AddCase = ({
  respondNext,
  data,
}: {
  respondNext: (
    allowed: boolean,
    data: {
      caseName: string;
      difficulty: string;
      score: number;
      input: string;
      output: string;
      isSample: boolean;
    }[]
  ) => void;
  data: {
    caseName: string;
    difficulty: string;
    score: number;
    input: string;
    output: string;
    isSample: boolean;
  }[];
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const [caseName, setCaseName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [score, setScore] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isSample, setIsSample] = useState<boolean>(false);

  const [testCases, setTestCases] = useState<
    {
      caseName: string;
      difficulty: string;
      score: number;
      input: string;
      output: string;
      isSample: boolean;
    }[]
  >([]);

  useEffect(() => {
    setTestCases(data);
  }, []);

  const submitProblem = () => {
    if (verifyFields()) {
      respondNext(true, testCases);
    } else {
      respondNext(false, null as any);
    }
  };

  const verifyFields = (): boolean => {
    if (testCases.length === 0) {
      return false;
    }
    return true;
  };

  const saveCase = () => {
    if (caseName && difficulty && score && input && output) {
      setTestCases([
        ...testCases,
        {
          caseName,
          difficulty,
          score,
          input,
          output,
          isSample,
        },
      ]);
      setOpen(false);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className=" overflow-y-auto h-[77vh] pr-16">
      <h5>Test Cases</h5>
      <div>
        <div className="flex gap-3">
          <Button className="mt-4" variant="link" onClick={() => setOpen(true)}>
            Add Test Case
          </Button>
          <Button className="mt-4">Import from CSV</Button>
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
                  <TableCell>{item.caseName}</TableCell>
                  <TableCell>{item.input}</TableCell>
                  <TableCell>{item.output}</TableCell>
                  <TableCell>{item.difficulty}</TableCell>
                  <TableCell>{item.score}</TableCell>
                  <TableCell>{item.isSample ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Button variant="link">Edit</Button>
                    <Button variant="link">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button className="mt-5 float-right" onClick={() => submitProblem()}>
          Next
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Case</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <p>
                  Case Name <span className="text-red-500">*</span>
                </p>
                <Input
                  placeholder="Enter case name"
                  className="mt-3"
                  value={caseName}
                  onChange={(e) => setCaseName(e.target.value)}
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

              <div className="flex gap-5 mt-5 items-center justify-center">
                <div>
                  <p>Input</p>
                  <Textarea
                    className="w-[220px] mt-3"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>

                <div>
                  <p>Output</p>
                  <Textarea
                    className="w-[220px] mt-3"
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Checkbox
                  checked={isSample}
                  onCheckedChange={() => setIsSample(!isSample)}
                />
                <p>
                  Is a Sample Test Case? <span className="text-red-500">*</span>
                </p>
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
    </div>
  );
};

export default AddCase;
