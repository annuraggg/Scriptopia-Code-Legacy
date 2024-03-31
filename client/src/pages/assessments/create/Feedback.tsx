import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

const Feedback = ({
  saveScreening,
  feedbackEmail,
  setFeedbackEmail,
  feedbackPhone,
  setFeedbackPhone,
  saving,
}: {
  saveScreening: () => void;
  feedbackEmail: string;
  setFeedbackEmail: (feedbackEmail: string) => void;
  feedbackPhone: string;
  setFeedbackPhone: (feedbackPhone: string) => void;
  saving: boolean;
}) => {
  return (
    <>
      <div className="h-[75vh]">
        <h2>Feedback</h2>
        <p>Feedback for the candidates.</p>

        <p className="mt-5">Where can the candidate contact for feedback?</p>

        <div className="w-[300px] mt-5">
          <Input
            type="text"
            className="input w-full mt-2"
            placeholder="Email"
            value={feedbackEmail}
            onChange={(e) => setFeedbackEmail(e.target.value)}
          />
          <Input
            type="text"
            className="input w-full mt-3"
            placeholder="Phone"
            value={feedbackPhone}
            onChange={(e) => setFeedbackPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button className="btn-primary mt-5" onClick={saveScreening}>
          {saving ? <ReloadIcon className="w-5 h-5 animate-spin" /> : "Save"}
        </Button>
      </div>
    </>
  );
};

export default Feedback;
