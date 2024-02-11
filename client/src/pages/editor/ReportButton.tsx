import { MdOutlinedFlag } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const issues = [
  {
    id: 1,
    title: "Description or examples are unclear or incorrect",
  },
  {
    id: 2,
    title: "Incorrect or missing information",
  },
  {
    id: 3,
    title: "Typo or spelling error",
  },
  {
    id: 4,
    title: "Testcases are missing or incorrect",
  },
  {
    id: 5,
    title: "Other",
  },
];

const ReportButton = () => {
  const submitReport = () => {
    toast.success("Report submitted successfully");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="
                cursor-pointer
                hover:bg-gray-700
                rounded-full
                p-2 transition-all"
              >
                <MdOutlinedFlag />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" style={{ zIndex: "50" }}>
              <p>Report</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report</DialogTitle>
          <DialogDescription>Why are you reporting this?</DialogDescription>
        </DialogHeader>
        {issues.map((issue) => (
          <div className="flex gap-2 items-center" key={issue.id}>
            <Checkbox value={issue.id} />
            <p>{issue.title}</p>
          </div>
        ))}
        <Textarea placeholder="Any Additional Info." className="mt-5" />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={submitReport}>
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportButton;
