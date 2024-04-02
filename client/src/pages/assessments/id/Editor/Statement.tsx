import Quill, { Delta } from "quill/core";
import { useEffect } from "react";

const Statement = ({ statement }: { statement: Delta }) => {
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
    <div className="h-[89vh] w-[48vw] bg-primary-foreground rounded-lg">
      <div className="bg-secondary p-3 rounded-t-lg">Statement</div>
      <div
        id="statement"
        className="h-[85vh] overflow-y-auto p-5"
        style={{ border: "none" }}
      ></div>
    </div>
  );
};

export default Statement;
