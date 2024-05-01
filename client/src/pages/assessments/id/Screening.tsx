import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScreeningType from "@/types/Screenings";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
/*const socket = io(import.meta.env.VITE_SOCKET_ADDRESS);

socket.on("begin", (data) => {
  console.log(data);
});
*/
const Screening = () => {
  const navigate = useNavigate();
  const [screening, setScreening] = useState<ScreeningType | null>(
    {} as ScreeningType
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [infoText, setInfoText] = useState<string>("");
  const [infoColor, setInfoColor] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const id = window.location.pathname.split("/").pop();
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/get/${id}`)
      .then((res) => {
        setScreening(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch screenings");
        setLoading(false);
      });
  }, []);

  const submit = () => {
    const id = window.location.pathname.split("/").pop();
    if (!name || !email) {
      setInfoText("Please fill in all fields");
      setInfoColor("red");
      return;
    }

    setSubmitLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/begin`, {
        name,
        email,
        screeningId: window.location.pathname.split("/").pop(),
      })
      .then((res) => {
        setInfoText(res.data.message);
        setInfoColor("green");
        setSubmitLoading(false);

        socket.emit("join", {
          room: email + id,
        });

        axios
          .post(
            `${
              import.meta.env.VITE_BACKEND_ADDRESS
            }/screenings/begin/handshake`,
            {
              name,
              email,
              screeningId: id,
            }
          )
          .then(() => {
            setPage(1);
          })
          .catch((err) => {
            console.error(err);
            toast.error(err.response.data.message);
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.message);
        setSubmitLoading(false);
      });
  };

  if (loading)
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <ReloadIcon className="animate-spin h-5 w-5" />
      </div>
    );

  if (!screening) return <div>Screening not found</div>;

  const bgScreeningDiv = {
    backgroundImage: `url("/assets/bg-waves.svg")`,
    backgroundSize: "cover",
  };

  const beginAssess = () => {
    const id = window.location.pathname.split("/").pop();
    localStorage.setItem("timer", JSON.stringify({ minutes: screening?.duration, seconds: 0 }))
    localStorage.removeItem("SessionRewindSessionData");
    navigate(`/screenings/current`, {
      state: { email, name, id, screening: screening },
    });
  };

  return (
    <div
      className="flex items-center justify-center h-[100vh] bg-screening-div"
      style={bgScreeningDiv}
    >
      <div className=" bg-primary-foreground h-[80vh] w-[50vw] rounded-lg p-10">
        <img src="/assets/img/logo.svg" alt="logo" className="w-32" />

        {page === 0 ? (
          <div className=" flex items-center justify-center flex-col h-full gap-5">
            <div className="mt-5">
              <p className=" text-center text-xs">Screening</p>
              <h1>{screening?.name}</h1>
            </div>
            <div>
              <Input
                placeholder="Enter Your Name"
                className="mt-3 w-64"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Input
                placeholder="Enter Your Email"
                className="mt-3"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <p className="text-xs">Time Limit: {screening?.duration} mins.</p>

            <Button className="mt-5" onClick={submit}>
              {submitLoading ? (
                <ReloadIcon className="h-5 w-5 animate-spin" />
              ) : (
                "Begin Screening"
              )}
            </Button>

            <p className={`h-4 text-${infoColor}-500`}>{infoText}</p>

            <p className="text-gray-300 text-xs mt-2">
              By clicking on the "Begin Screening" button, you agree to our
              Terms of Service and Privacy Policy.
            </p>
            <p className="text-gray-500 text-xs text-center">
              For any disrepancies, please contact the organization that sent
              you this screening at {screening?.feedback?.email}
            </p>
          </div>
        ) : (
          <div className=" flex items-center justify-center flex-col h-full gap-5">
            <h2>Instructions</h2>
            <p>{screening?.instructions}</p>
            <Button onClick={beginAssess} className="mt-5">
              Begin
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Screening;
