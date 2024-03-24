import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const Scoring = ({ goNext }: { goNext: (current: string) => void }) => {
  return (
    <div>
      <h2>Scoring</h2>
      <div className="mt-5 flex gap-5 items-center">
        <Checkbox />
        <p>Use Default Problem Scoring for All Problems</p>
      </div>
    </div>
  );
};

export default Scoring;
