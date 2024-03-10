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

const StatementComponent = () => {
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

  new EditorJS({
    autofocus: true,
    holder: "statement",
    inlineToolbar: true,
    tools,
    placeholder: "Write Problem Statement Here",
  });

  /*const handleSave = async () => {
    const data = await editor.saver.save();
    document.write(JSON.stringify(data));
  };*/

  return (
    <div className="h-[100%] w-[50%] rounded p-3 bg-secondary">
      <style>
        {`

          #statement {
            background: rgba(255,255,255,1);
            color: black;
            padding: 10px 20px;
            padding-left: 60px;
          }
        `}
      </style>
      <h3 className="mb-2 mt-2">Enter Problem Statement Here</h3>

      <div
        id="statement"
        className="h-[70vh] w-full rounded overflow-y-auto"
        style={{ border: "1px solid gray" }}
      ></div>
    </div>
  );
};

export default StatementComponent;
