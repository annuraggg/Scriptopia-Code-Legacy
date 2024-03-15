import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import ReportButton from "./ReportButton";
import Meta from "@/types/ProblemMeta";
import EditorJS from "@editorjs/editorjs";
// @ts-expect-error
import Header from "@editorjs/header";
// @ts-expect-error
import List from "@editorjs/list";
// @ts-expect-error
import CodeTool from "@editorjs/code";
// @ts-expect-error
import Table from "@editorjs/table";
// @ts-expect-error
import Warning from "@editorjs/warning";

const glassFrost = {
  backdropFilter: "blur(30px)",
  backgroundColor: "rgba(40,44,52, 0.95)",
};

const tools = {
  header: {
    class: Header,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  code: {
    class: CodeTool,
    config: {
      placeholder: "Enter code",
      inlineToolbar: true,
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
  },
};

const ProblemStatement = ({
  statement,
  meta,
}: {
  statement: any;
  meta: Meta;
}) => {
  useEffect(() => {
    if (statement?.blocks?.length != undefined) {
      new EditorJS({
        holder: "statement",
        data: statement,
        readOnly: true,
        tools,
      });
    }
  }, [statement]);

  return (
    <div className="rounded-lg" style={glassFrost}>
      <div className="flex items-center justify-between bg-secondary rounded-t-lg sticky p-2.5 px-7 text-gray-400">
        <p>Problem Statement</p>
        <div className="flex items-center justify-between gap-5">
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
        <div className="rounded-lg bg-accent overflow-y-auto gap-5 flex px-10 py-0">
          {meta.tags?.map((tag, index) => (
            <Badge variant="outline" className="border border-blue-500" key={index}>
              {tag}
            </Badge>
          ))}
        </div>
        <div
          className="rounded-lg bg-accent mt-[-20px]"
          id="statement"
          style={{ border: "none" }}
        ></div>
      </div>
    </div>
  );
};

export default ProblemStatement;
