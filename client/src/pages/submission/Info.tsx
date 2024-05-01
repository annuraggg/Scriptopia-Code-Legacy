import Submission from "@/types/Submission";
import { useNavigate } from "react-router-dom";

const Info = ({ submission }: { submission: Submission }) => {
  const navigate = useNavigate();
  const getDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-secondary rounded-lg p-5 h-[84vh]">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">Submission Info</p>
        <p className="text-gray-400">
          {submission?.status === "PASSED" ? (
            <span className="text-green-400">Accepted</span>
          ) : submission?.status === "FAILED" ? (
            <span className="text-red-400">Wrong Answer</span>
          ) : submission?.status === "TLE" ? (
            <span className="text-yellow-400">Time Limit Exceeded</span>
          ) : (
            <span className="text-yellow-400">Running</span>
          )}
        </p>
      </div>
      <div className="flex items-center justify-between mt-5 px-10 py-5 gap-5 flex-wrap">
        <div className="w-[48%] bg-primary-foreground border border-primary-foreground py-5 rounded flex flex-col items-center">
          <p className="text-xs">Language</p>
          <p className=" text-lg font-bold">
            {submission?.language.slice(0, 1).toUpperCase() +
              submission?.language.slice(1)}
          </p>
        </div>
        <div className="w-[48%] bg-primary-foreground border border-primary-foreground py-5 rounded flex flex-col items-center">
          <p className="text-xs">Memory</p>
          <p className=" text-lg font-bold">
            {submission?.output.memoryUsage.toFixed(2)} KB
          </p>
        </div>
        <div className="w-[48%] bg-primary-foreground border border-primary-foreground py-5 rounded flex flex-col items-center">
          <p className="text-xs">Time</p>
          <p className=" text-lg font-bold">
            {submission?.output.runtime.toFixed(2)} ms
          </p>
        </div>
        <div className="w-[48%] bg-primary-foreground border border-primary-foreground py-5 rounded flex flex-col items-center">
          <p className="text-xs">Submitted At</p>
          <p className=" text-lg font-bold">
            {getDate(submission?.output?.timeStamp)}
          </p>
        </div>

        <div className="bg-primary-foreground p-5 w-full rounded">
          <p className="text-xs">Submitted By</p>
          <p
            className=" text-lg font-bold hover:text-blue-500 cursor-pointer duration-300 transition-all"
            onClick={() => navigate(`/u/${submission?.userID}`)}
          >
            {submission?.userID}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
