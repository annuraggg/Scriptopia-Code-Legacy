import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const Security = ({ goNext }: { goNext: (current: string) => void }) => {
  return (
    <div>
      <h2>Security</h2>
      <div className="mt-5 flex gap-5 items-center">
        <Checkbox />
        <p>Enable Code Playback</p>
      </div>

      <div className="mt-5 flex gap-5 items-center">
        <Checkbox />
        <p>Enable Tab Change Detection</p>
      </div>

      <div className="mt-5 flex gap-5 items-center">
        <Checkbox />
        <p>Enable GPT Detection</p>
      </div>

      <div className="mt-5 flex gap-5 items-center">
        <Checkbox />
        <p>Enable Copy / Paste Detection</p>
      </div>

      <div className="mt-5 flex gap-5 items-center">
        <Checkbox />
        <p>Enable Plagarism Detection</p>
      </div>
    </div>
  );
};

export default Security;
