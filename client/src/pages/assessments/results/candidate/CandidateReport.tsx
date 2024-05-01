import { Navbar } from "@/components/ui/navbar";
import { useEffect, useState } from "react";
import { FaScissors } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoExit } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/Loader";

interface CandidateReport {
  name: string;
  email: string;
  assessmentDate: string;
  sessionRewind: string;
  scores: {
    average: number;
    qualifying: number;
    total: number;
  };
  cheating: {
    detected: boolean;
    pastedCode: boolean;
    windowSwitch: boolean;
  };
  skillRating: {
    [key: string]: {
      score: number;
      outOf: number;
      outOfHundred: number;
    };
  };
  challengeSolution: {
    id: number;
    name: string;
    timeTaken: number;
    difficulty: string;
    status: number;
    language: string;
    cheating: {
      detected: boolean;
      pastedCode: number;
      windowSwitch: number;
    };
    score: number;
  }[];
}

const CandidateReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState<CandidateReport>(
    {} as CandidateReport
  );

  useEffect(() => {
    const id = window.location.pathname.split("/")[5];
    const sid = window.location.pathname.split("/")[2];
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/candidate`, {
        candidateId: id,
        screeningId: sid,
      })
      .then((res) => {
        setCandidate(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch candidate");
      })
      .finally(() => setLoading(false));
  }, []);

  const convertToDate = (date: string) => {
    return new Date(date).toDateString();
  };

  const convertToMinsSecs = (time: number) => {
    const mins = Math?.floor(time / 60);
    const secs = time % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="px-10 py-5">
        <div className="flex gap-20">
          <div>
            <h1>{candidate?.name}</h1>
            <p>{candidate?.email}</p>
            <p className="text-sm text-gray-400 mt-5">
              Assessment given on {convertToDate(candidate?.assessmentDate)}
            </p>
          </div>

          <div className="w-full">
            <h3>Scores</h3>
            <div className="flex gap-5 mt-5">
              <Card className="w-full rounded-lg">
                <CardHeader className=" bg-yellow-600 bg-opacity-90 h-full w-full rounded-lg flex items-center justify-around text-gray-200">
                  <CardTitle className="text-4xl">Scores</CardTitle>

                  <div className="flex gap-10 items-center justify-center text-md">
                    <div className="flex flex-col justify-center items-end">
                      <p>Average</p>
                      {candidate?.scores?.average}%
                    </div>
                    <p className="flex flex-col justify-center items-end">
                      <p>Qualifying</p>
                      {candidate?.scores?.qualifying}%
                    </p>
                    <p className="flex flex-col justify-center items-end">
                      <p>Total Score</p>
                      {candidate?.scores?.total.toFixed(2)}%
                    </p>
                  </div>
                </CardHeader>
              </Card>

              <Card className="w-full rounded-lg">
                <CardHeader className=" bg-red-600 rounded-lg flex flex-row items-center justify-between text-gray-200">
                  <CardTitle>Cheating</CardTitle>

                  <p className="flex flex-col justify-center items-end">
                    {candidate?.cheating?.detected
                      ? "Detected"
                      : "Not Detected"}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className=" py-2 mt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaScissors />
                        <p className="ml-2">Pasted Code</p>
                      </div>

                      <div
                        className={`${
                          candidate?.cheating?.pastedCode
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {candidate?.cheating?.pastedCode ? "Yes" : "No"}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-5">
                      <div className="flex items-center">
                        <IoExit />
                        <p className="ml-2">Window Switch</p>
                      </div>

                      <div
                        className={`${
                          candidate?.cheating?.windowSwitch
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {candidate?.cheating?.windowSwitch ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {candidate?.scores?.total < candidate?.scores?.qualifying ? (
              <div className="p-5 border mt-5 rounded-lg flex items-center gap-5 text-red-600">
                <p>Not Qualified</p>
              </div>
            ) : (
              <div className="p-5 border mt-5 rounded-lg flex items-center gap-5 text-green-600">
                <p>Qualified</p>
              </div>
            )}

            <div
              className="p-5 border mt-5 rounded-lg flex items-center gap-5 hover:text-purple-500 cursor-pointer duration-300 transition-all"
              onClick={() => window.open(candidate?.sessionRewind, "_blank")}
            >
              <FaPlay />
              <p> Watch Session Rewind</p>
            </div>

            <Separator className="my-10" />

            <h3>Skills</h3>
            <div className="flex gap-3 flex-wrap mt-3">
              {Object?.keys(candidate?.skillRating || {})?.map((skill) => (
                <Card className="w-[350px] rounded-lg">
                  <CardHeader className="">
                    <div className="flex justify-between mb-5 h-[40px]">
                      <CardTitle className="text-xl">
                        {skill?.charAt(0)?.toUpperCase() + skill?.slice(1)}
                      </CardTitle>
                      <img
                        src={`/assets/languages/${skill}.svg`}
                        width={40}
                        alt={skill}
                      />
                    </div>

                    <div className="flex gap-5 items-center">
                      <Progress
                        value={candidate?.skillRating[skill]?.outOfHundred}
                        max={100}
                      />
                      <p>
                        {candidate?.skillRating[skill]?.score}/
                        {candidate?.skillRating[skill]?.outOf}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Separator className="my-10" />

            <h3>Challenge Solutions</h3>
            <div className="flex gap-3 flex-col mt-3">
              {candidate?.challengeSolution?.map((solution) => (
                <div className="border p-5 rounded-md flex">
                  <div className="flex flex-col justify-center w-[50%]">
                    <h3>{solution?.name}</h3>
                    <div className="flex gap-5 text-xs mt-2">
                      <p>{solution?.language.toUpperCase()}</p>
                      <p>
                        {solution?.difficulty.slice(0, 1).toUpperCase() +
                          solution?.difficulty.slice(1)}
                      </p>
                      <p>{convertToMinsSecs(solution?.timeTaken)}</p>
                    </div>
                    <Button
                      variant="link"
                      onClick={() =>
                        navigate(window.location.pathname + "/s/" + solution.id)
                      }
                    >
                      View Solution
                    </Button>
                  </div>

                  <Separator orientation="vertical" className="h-20 mx-5" />

                  <div className="flex flex-col justify-center w-[50%]">
                    <p>
                      {solution?.status === 200 ? "Accepted" : "Not Accepted"}
                    </p>
                    <p
                      className={
                        solution?.cheating?.detected
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {solution?.cheating?.detected
                        ? "Cheating Detected"
                        : "No Cheating Detected"}
                    </p>

                    <div className="flex gap-5 mt-3">
                      <span className=" w-fit rounded-lg flex gap-5 border px-2 py-1 text-xs">
                        <p>Pasted {solution?.cheating?.pastedCode} Times</p>
                      </span>

                      <span className=" w-fit rounded-lg flex gap-5 border px-2 py-1 text-xs">
                        <p>
                          Window Switch {solution?.cheating?.windowSwitch} Times
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateReport;
