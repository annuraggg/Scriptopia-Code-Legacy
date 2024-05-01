import { Textarea } from "@/components/ui/textarea";

const Instructions = ({
  instructions,
  setInstructions,
}: {
  instructions: string;
  setInstructions: (instructions: string) => void;
}) => {
  return (
    <div>
      <h2>Instructions</h2>
      <p>Instructions for the candidates.</p>

      <div className="mt-5">
        <Textarea
          placeholder="Instructions"
          className="h-[60vh]"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Instructions;
