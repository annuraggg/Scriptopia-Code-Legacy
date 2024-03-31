import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Feedback = ({
  saveScreening,
  feedbackEmail,
  setFeedbackEmail,
  feedbackPhone,
  setFeedbackPhone,
}: {
  saveScreening: () => void;
  feedbackEmail: string;
  setFeedbackEmail: (feedbackEmail: string) => void;
  feedbackPhone: string;
  setFeedbackPhone: (feedbackPhone: string) => void;
}) => {
  return (
    <div>
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

      <Button
        className="btn-primary mt-5 absolute bottom-10 right-10"
        onClick={saveScreening}
      >
        Save
      </Button>
    </div>
  );
};

export default Feedback;
