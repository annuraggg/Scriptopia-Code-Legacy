import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React from "react";

const Candidates = ({ nextTab }: { nextTab: (currentTab: string) => void }) => {
  return (
    <div>
      <h2>Candidates</h2>
      <p>Invite candidates to take the screening</p>

      <div className="flex gap-5 mt-5">
        <Checkbox />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Allow all candidates with link to take the screening
        </label>
      </div>

      <div className="flex gap-5">
        <Input placeholder="Enter email address" className="mt-5 w-[500px]" />
        <Button className="btn-primary mt-5">Add</Button>
      </div>

      <div className="mt-5 flex gap-5 absolute right-10 bottom-10">
        <Button className="btn-primary" onClick={() => nextTab("general")}>
          Back
        </Button>

        <Button className="btn-primary" onClick={() => nextTab("candidates")}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Candidates;
