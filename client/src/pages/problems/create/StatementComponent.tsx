import React, { useEffect, useState } from "react";
import Quill from "quill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";

const StatementComponent = () => {
  const [title, setTitle] = useState<string>("");
  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

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

  let editor: EditorJS;

  useEffect(() => {
    editor = new EditorJS({
      autofocus: true,
      holder: "statement",
      inlineToolbar: true,
      tools,
      placeholder: "Write Problem Statement Here",
    });
  }, []);

  const handleSave = async () => {
    const data = await editor.saver.save();
    document.write(JSON.stringify(data))
  };

  return (
    <div className="h-[100%] w-[50%] rounded p-3">
      <div
        id="statement"
        className="h-full rounded pl-20 px-10 py-5 bg-white text-black bg-opacity-100 overflow-y-auto"
        style={{ border: "1px solid gray" }}
      ></div>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default StatementComponent;
