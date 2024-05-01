import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const Security = ({
  codePlaybacks,
  setCodePlaybacks,
  tabChangeDetection,
  setTabChangeDetection,
  gptDetection,
  setGptDetection,
  copyPasteDetection,
  setCopyPasteDetection,
  plagiarismDetection,
  setPlagiarismDetection,
  fullScreenExitDetection,
  setFullScreenExitDetection,
}: {
  codePlaybacks: boolean;
  setCodePlaybacks: (codePlaybacks: boolean) => void;
  tabChangeDetection: boolean;
  setTabChangeDetection: (tabChangeDetection: boolean) => void;
  gptDetection: boolean;
  setGptDetection: (gptDetection: boolean) => void;
  copyPasteDetection: boolean;
  setCopyPasteDetection: (copyPasteDetection: boolean) => void;
  plagiarismDetection: boolean;
  setPlagiarismDetection: (plagiarismDetection: boolean) => void;
  fullScreenExitDetection: boolean;
  setFullScreenExitDetection: (fullScreenExitDetection: boolean) => void;
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const selectAllCall = (e: boolean) => {
    setSelectAll(e);
    setCodePlaybacks(e);
    setTabChangeDetection(e);
    setGptDetection(e);
    setCopyPasteDetection(e);
    setPlagiarismDetection(e);
    setFullScreenExitDetection(e);
  };

  useEffect(() => {
    if (
      codePlaybacks &&
      tabChangeDetection &&
      gptDetection &&
      copyPasteDetection &&
      plagiarismDetection
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [
    codePlaybacks,
    tabChangeDetection,
    gptDetection,
    copyPasteDetection,
    plagiarismDetection,
  ]);

  return (
    <div className="flex gap-5">
      <div>
        <h2>Security</h2>

        <div className="mt-10 flex gap-5 items-center">
          <Checkbox
            onCheckedChange={(e: boolean) => selectAllCall(e)}
            checked={selectAll}
          />
          <p>Select All</p>
        </div>

        <Separator className="my-5" />

        <div className="mt-5 flex gap-5 items-center">
          <Checkbox
            checked={codePlaybacks}
            onCheckedChange={() => setCodePlaybacks(!codePlaybacks)}
          />
          <p>Enable Code Playback</p>
        </div>

        <div className="mt-5 flex gap-5 items-center">
          <Checkbox
            checked={tabChangeDetection}
            onCheckedChange={() => setTabChangeDetection(!tabChangeDetection)}
          />
          <p>Enable Tab Change Detection</p>
        </div>

        <div className="mt-5 flex gap-5 items-center">
          <Checkbox
            checked={copyPasteDetection}
            onCheckedChange={() => setCopyPasteDetection(!copyPasteDetection)}
          />
          <p>Enable Copy / Paste Detection</p>
        </div>

        <div className="mt-5 flex gap-5 items-center">
          <Checkbox
            checked={fullScreenExitDetection}
            onCheckedChange={() => setFullScreenExitDetection(!fullScreenExitDetection)}
          />
          <p>Enable Fullscreen Exit Detection</p>
        </div>
      </div>
    </div>
  );
};

export default Security;
