import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import ReportButton from "./ReportButton";
import Meta from "@/types/ProblemMeta";
import Quill from "quill";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Delta } from "quill/core";
import UserToken from "@/types/UserToken";

const glassFrost = {
  backdropFilter: "blur(30px)",
  backgroundColor: "rgba(40,44,52, 0.95)",
};

const ProblemStatement = ({
  statement,
  meta,
}: {
  statement: Delta;
  meta: Meta;
}) => {
  const navigate = useNavigate();
  const user = useSelector((state: { user: UserToken }) => state.user);

  useEffect(() => {
    const q = new Quill("#statement", {
      modules: {
        toolbar: false,
      },
      readOnly: true,
      theme: "snow",
    });
    q.setContents(statement);
  }, [statement]);

  return (
    <div className="rounded-lg" style={glassFrost}>
      <div className="flex items-center justify-between bg-secondary rounded-t-lg sticky p-2.5 px-7 text-gray-400">
        <div className="flex items-center justify-center">
          <p className="truncate max-w-[80%]">{meta.title}</p>
          <p
            className="hover:underline hover:text-primary cursor-pointer text-[12px] ml-1"
            onClick={() => navigate(`/u/${meta.author}`)}
          >
            by @{meta.author}
          </p>
        </div>
        <div className="flex items-center justify-between gap-5">
          {meta.authorid === user?.id && (
            <a
              className=" cursor-pointer hover:text-primary"
              onClick={() => navigate(`/problems/${meta.id}/edit`)}
            >
              Edit
            </a>
          )}
          <Badge
            className={`ml-5 ${
              meta?.difficulty === "easy"
                ? "bg-green-400"
                : meta?.difficulty === "medium"
                ? "bg-yellow-400"
                : "bg-red-400"
            }`}
          >
            {meta?.difficulty?.toUpperCase()}
          </Badge>
          <ReportButton />
        </div>
      </div>
      <div className=" overflow-y-auto h-[77vh] rounded-b-lg bg-secondary">
        <div
          className="rounded-lg bg-accent"
          id="statement"
          style={{ border: "none" }}
        ></div>
      </div>
    </div>
  );
};

export default ProblemStatement;
