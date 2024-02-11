import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Case = {
  input: [string];
  output: [string];
};

const SolutionComponent = () => {
  const [totalCases, setTotalCases] = useState<number>(1);
  const [cases, setCases] = useState<Case[]>([]);

  const caseInputRef = useRef<HTMLInputElement>(null);
  const caseOutputRef = useRef<HTMLInputElement>(null);

  const handleAddCase = (): void => {
    setTotalCases(totalCases + 1);
    const newCase: Case = {
      input: [caseInputRef.current?.value as string],
      output: [caseOutputRef.current?.value as string],
    };

    setCases([...cases, newCase]);
  };

  return (
    <div className="p-5 bg-accent w-[50%] rounded h-[97%] mt-2 relative flex flex-col justify-between">
      <div className="h-full overflow-y-auto">
        <h3>Problem Details</h3>

        <Input
          placeholder="Enter Tags, Seperated By Spaces"
          className="border border-primary mt-5 mb-5"
        />

        <p className="mb-3">Test Cases: </p>
        <div className="flex">
          <Button className="mr-5">Import as CSV</Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Case</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Case</DialogTitle>
                <DialogDescription>
                  Add a Test Case to the problem
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Input
                  </Label>
                  <Input id="input" className="col-span-3" ref={caseInputRef} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Expected Output
                  </Label>
                  <Input
                    id="output"
                    className="col-span-3"
                    ref={caseOutputRef}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button type="submit" onClick={handleAddCase}>
                    Add
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {cases.map((c, i) => {
          return (
            <div key={i} className="bg-gray-700 p-3 rounded my-2">
              <p>Input: {c.input}</p>
              <p>Output: {c.output}</p>
            </div>
          );
        })}
      </div>

      <div className=" pt-4">
        <Button className="float-right">SUBMIT</Button>
      </div>
    </div>
  );
};

export default SolutionComponent;
