import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

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
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const verifyEmail = (email: string) => {
    setFeedbackEmail(email);

    if (email === "") {
      setEmailError("Email is required");
      return;
    }

    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    setEmailError("");
  };

  const verifyPhone = (phone: string) => {
    setFeedbackPhone(phone);

    if (phone === "") {
      setPhoneError("Phone is required");
      return;
    }

    const re = /^[0-9]{10}$/;
    if (!re.test(phone)) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    setPhoneError("");
  };

  return (
    <>
      <div className="h-[75vh]">
        <h2>Feedback</h2>
        <p>Feedback for the candidates.</p>

        <p className="mt-5">Where can the candidate contact for feedback?</p>

        <div className="w-[600px] mt-5">
          <div className="flex items-center gap-5">
            <Input
              type="text"
              className="input mt-2 w-[300px]"
              placeholder="Email"
              value={feedbackEmail}
              onChange={(e) => verifyEmail(e.target.value)}
            />

            <p className=" text-red-500 text-sm">{emailError}</p>
          </div>

          <div className="flex gap-5 items-center">
            <Input
              type="text"
              className="input w-[300px] mt-3"
              placeholder="Phone"
              value={feedbackPhone}
              onChange={(e) => verifyPhone(e.target.value)}
            />

            <p className=" text-red-500 text-sm">{phoneError}</p>
          </div>
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
