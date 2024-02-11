import { Badge } from "@/components/ui/badge";
import Quill from "quill";
import { useEffect } from "react";
import ReportButton from "./ReportButton";
import { Delta } from "quill/core";
import Meta from "@/types/ProblemMeta";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import Table from "@editorjs/table";
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
      console.log(statement?.blocks?.length);
      new EditorJS({
        holder: "statement",
        data: statement,
        readOnly: true,
        tools,
      });
    }
  }, [statement]);

  return (
    <div className="md:w-[50%] w-[100%] rounded-t" style={glassFrost}>
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
      <div
        className="rounded-lg h-[82vh] bg-accent overflow-y-auto"
        id="statement"
        style={{ border: "none" }}
      ></div>
    </div>
  );
};

export default ProblemStatement;
