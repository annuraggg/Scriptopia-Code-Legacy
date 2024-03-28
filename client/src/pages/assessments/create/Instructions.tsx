import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Instructions = ({
  nextTab,
}: {
  nextTab: (currentTab: string) => void;
}) => {
  return (
    <div>
      <h2>Instructions</h2>
      <p>Instructions for the candidates.</p>

      <div className="mt-5">
        <Textarea placeholder="Instructions" className="h-[60vh]" />
      </div>

      <div className="mt-5 flex gap-5 absolute right-10 bottom-10">
        <Button className="btn-primary" onClick={() => nextTab("candidates")}>
          Back
        </Button>

        <Button className="btn-primary" onClick={() => nextTab("instructions")}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Instructions;
