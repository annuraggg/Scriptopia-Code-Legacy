import { Button } from "@/components/ui/button";
import Screening from "@/types/Screenings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [screening, setScreening] = useState<Screening | null>({} as Screening);
  const [timer, setTimer] = useState(
    JSON.parse(localStorage.getItem("timer") || "{}")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.seconds === 0) {
        if (timer.minutes === 0) {
          clearInterval(interval);
        } else {
          setTimer({
            minutes: timer.minutes - 1,
            seconds: 59,
          });
        }
      } else {
        setTimer({
          minutes: timer.minutes,
          seconds: timer.seconds - 1,
        });
      }
    }, 1000);

    localStorage.setItem("timer", JSON.stringify(timer));

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const state = window.history.state;
    sessionStorage.setItem("email", state.usr.email);
    sessionStorage.setItem("id", state.usr.id);
    setScreening(state.usr.screening);

    const nonce = Math.random().toString(36).substring(7);

    // @ts-expect-error - Rewind is not defined
    window?.sessionRewind?.startSession();
    // @ts-expect-error - Rewind is not defined
    window?.sessionRewind?.identifyUser({
      userId: sessionStorage.getItem("email") + nonce + sessionStorage.getItem("id")d,
      email: sessionStorage.getItem("email"),
      id: sessionStorage.getItem("id"),
      nonce: nonce
    });
  }, []);

  const navigate = useNavigate();

  const bgScreeningDiv = {
    backgroundImage: `url("/assets/bg-waves.svg")`,
    backgroundSize: "cover",
  };

  const endScreening = () => {
    // @ts-expect-error - Rewind is not defined
    window?.sessionRewind?.stopSession();
  };

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
            {timer.minutes} minutes and {timer.seconds} seconds left
          </p>
        </div>
        <div className="flex items-center justify-center mt-5">
          <div className="w-[800px]">
            {screening?.questions?.map((question, index) => (
              <div
                key={index}
                className="mt-2 py-2 px-5 flex items-center justify-between border rounded-lg"
              >
                <p>{question.title}</p>
                <Button
                  variant="link"
                  onClick={() => {
                    navigate(`/screening/current/editor`, {
                      state: {
                        id: question._id,
                        languages: screening.languages || ["javascript"],
                        duration: screening.duration,
                      },
                    });
                  }}
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
          onClick={endScreening}
        >
          End Screening
        </Button>
      </div>
    </div>
  );
};

export default Main;
