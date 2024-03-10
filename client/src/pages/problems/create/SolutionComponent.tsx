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
    <div className="p-5 bg-accent w-[50%] rounded h-[97%] relative flex flex-col justify-between">
      <div className="h-full overflow-y-auto">
        <h3>Problem Details</h3>
      </div>
    </div>
  );
};

export default SolutionComponent;
