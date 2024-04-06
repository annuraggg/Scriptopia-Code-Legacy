import { useNavigate } from "react-router-dom";

interface Submission {
  _id: string;
  problemID: string;
  userID: string;
  code: string;
  language: string;
  status: string;
  output: Record<string, string>; 
}

const Submissions = ({ submissions }: { submissions: Submission[] }) => {
  const navigate = useNavigate();

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
                <button
                  className="text-gray-300"
                  onClick={() => navigate(`/submission/${submission._id}`)}
                >
                  View
                </button>
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
