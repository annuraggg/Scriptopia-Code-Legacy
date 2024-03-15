import React, { useEffect } from "react";

interface Submission {
  problemID: string;
  userID: string;
  code: string;
  language: string;
  status: string;
  output: Record<string, any>; // Assuming the output can be any object type
}

const Submissions = ({ submissions }: { submissions: Submission[] }) => {
  return (
    <>
      <div className="flex items-center justify-between bg-secondary rounded-t-lg sticky p-2.5 px-7 text-gray-400">
        <p>Your Submissions</p>
      </div>
      <div className=" overflow-y-auto h-[78vh] w-full bg-secondary rounded-b-lg">
        <div className="flex flex-col gap-1 p-2">
          {submissions.map((submission, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 rounded-lg border bg-background"
            >
              <div className="flex gap-5">
                <p className="text-gray-300">Submission {i + 1}</p>
                <p className="text-gray-300">{submission.status}</p>
              </div>
              <div className="flex gap-5">
                <button className="text-gray-300">View</button>
                <button className="text-gray-300">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Submissions;
