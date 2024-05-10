/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Screening from "@/types/Screenings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

const Main = () => {
  const [screening, setScreening] = useState<Screening | null>({} as Screening);
  const [timer, setTimer] = useState(
    JSON?.parse(localStorage?.getItem("timer") || "{}")
  );
  const [solvedIDs, setSolvedIDs] = useState<string[]>([]);

  const [openEnd, setOpenEnd] = useState(false);
  const [ending, setEnding] = useState(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [sURL, setSURL] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer?.seconds === 0) {
        if (timer?.minutes === 0) {
          clearInterval(interval);
        } else {
          setTimer({
            minutes: timer?.minutes - 1,
            seconds: 59,
          });
        }
      } else {
        setTimer({
          minutes: timer?.minutes,
          seconds: timer?.seconds - 1,
        });
      }
    }, 1000);

    localStorage?.setItem("timer", JSON?.stringify(timer));

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const state = window?.history?.state;
    const submissions: any[] = JSON.parse(
      localStorage?.getItem("submission") || "[]"
    );
    const solved: string[] = [];
    submissions?.forEach((submission) => {
      solved.push(submission?.probID);
    });
    setSolvedIDs(solved);

    if (state?.usr?.screening === undefined) {
      window.location.href = "/";
    }

    sessionStorage?.setItem("email", state?.usr?.email);
    sessionStorage?.setItem("id", state?.usr?.id);
    setScreening(state?.usr?.screening);
    setName(state?.usr?.name);
    setEmail(state?.usr?.email);

    const nonce = Math.random().toString(36).substring(7);

    // @ts-expect-error - Rewind is not defined
    window?.sessionRewind?.startSession();
    // @ts-expect-error - Rewind is not defined
    window?.sessionRewind?.identifyUser({
      userId:
        sessionStorage?.getItem("email") +
        nonce +
        sessionStorage?.getItem("id"),
      email: sessionStorage?.getItem("email"),
      id: sessionStorage?.getItem("id"),
      nonce: nonce,
    });
  }, []);

  const navigate = useNavigate();

  const bgScreeningDiv = {
    backgroundImage: `url("/assets/bg-waves.svg")`,
    backgroundSize: "cover",
  };

  const endScreening = () => {
    let sessionUrl;
    // @ts-expect-error - Rewind is not defined
    window?.sessionRewind?.getSessionUrl((url: string) => (sessionUrl = url));
    // @ts-expect-error - Rewind is not defined
    window?.sessionRewind?.stopSession();

    const submission: any[] = JSON.parse(
      localStorage?.getItem("submission") || "[]"
    );

    if (sessionUrl !== undefined) setSURL(sessionUrl);

    setEnding(true);

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/end`, {
        name,
        email,
        id: sessionStorage?.getItem("id"),
        sessionUrl: sessionUrl ? sessionUrl : sURL,
        screeningID: screening?._id,
        submission,
      })
      .then(() => {
        toast.success("Screening ended successfully");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      })
      .catch(() => {
        toast.error("Error ending screening");
      })
      .finally(() => {
        setEnding(false);
        setOpenEnd(false);
      });
  };

  if (ending) {
    return (
      <div className="flex h-[100vh] items-center justify-center gap-5">
        <ReloadIcon className="w-10 h-10 animate-spin" />
        <h3>Saving Session</h3>
      </div>
    );
  }

  return (
    <div
      className=" flex items-center justify-center flex-col h-[100vh] gap-5"
      style={bgScreeningDiv}
    >
      <div className="bg-primary-foreground h-[80vh] w-[80vw] p-10 rounded-lg relative">
        <img src="/assets/img/logo.svg" alt="logo" className="w-32 mb-10" />
        <div className="flex items-center flex-col justify-center">
          <h1 className="text-gray-300">{screening?.name}</h1>

          <p className="text-gray-500 text-sm">
            {timer?.minutes} minutes and {timer?.seconds} seconds left
          </p>
        </div>
        <div className="flex items-center justify-center mt-5">
          <div className={`w-[800px]`}>
            {screening?.questions?.map((question, index) => (
              <div
                key={index}
                className={`mt-2 py-2 px-5 flex items-center justify-between border rounded-lg
                ${
                  solvedIDs.includes(question?._id)
                    ? "bg-green-900 bg-opacity-50 cursor-not-allowed disabled:"
                    : ""
                }
                `}
              >
                <p>{question?.title}</p>
                <Button
                  variant="link"
                  onClick={() => {
                    console.log(screening.security);
                    navigate(`/screening/current/editor`, {
                      state: {
                        id: question?._id,
                        languages: screening?.languages || ["javascript"],
                        screening: screening,
                        tabChange: screening?.security?.tabChangeDetection,
                        paste: screening?.security?.copyPasteDetection,
                        fullScreen: screening?.security?.fullScreenExitDetection,
                      },
                    });
                  }}
                  disabled={solvedIDs.includes(question?._id)}
                >
                  Answer
                </Button>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center mt-10 text-gray-500">
          For any disrepancies, please contact the organization that sent you
          this screening at {screening?.feedback?.email}
        </p>
        <Button
          className="mt-5 absolute bottom-10 right-10"
          variant="destructive"
          onClick={() => setOpenEnd(true)}
        >
          End Screening
        </Button>
      </div>

      <AlertDialog open={openEnd} onOpenChange={setOpenEnd}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will submit your answers and end the screening
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={endScreening}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Main;
