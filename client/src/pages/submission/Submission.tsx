import PageLoading from "@/components/PageLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import ProblemStatement from "../editor/ProblemStatement";
import ProblemMeta from "@/types/ProblemMeta";
import { Navbar } from "@/components/ui/navbar";
import CodeEditor from "./CodeEditor";
import Split from "react-split";
import Descriptor from "./Descriptor";
import Explain from "./Explain";
import { toast } from "sonner";
import { Delta } from "quill/core";
import SubmissionType from "@/types/Submission";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Info from "./Info";

const Submission = () => {
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<SubmissionType>(
    {} as SubmissionType
  );
  const [statement, setStatement] = useState<Delta>({} as Delta);
  const [meta, setMeta] = useState<ProblemMeta>({} as ProblemMeta);

  const [openSheet, setOpenValue] = useState(false);
  const [sheetLoading, setSheetLoading] = useState(false);
  const [explainResponse, setExplainResponse] = useState("");
  const [explainCodeStr, setExplainCodeStr] = useState<string>("");
  const [sheetError, setSheetError] = useState(false);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/submission`, {
        id,
      })
      .then((res) => {
        setSubmission(res?.data?.submission);
        setStatement(res?.data?.desc);
        setMeta(res?.data?.meta);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const explainCode = (code: string) => {
    setSheetLoading(true);
    setOpenValue(true);
    setExplainCodeStr(code);
    axios
      .post(`${import.meta.env?.VITE_BACKEND_ADDRESS}/compiler/explain`, {
        code: code,
      })
      .then((res) => {
        setExplainResponse(res?.data?.response);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.error(err?.response?.data?.message);
        setSheetError(true);
      })
      .finally(() => {
        setSheetLoading(false);
      });
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <>
      <Navbar />
      <div className="flex px-5 items-start justify-center gap-5 w-full">
        <Tabs defaultValue="problem" className="w-[50%]">
          <TabsList>
            <TabsTrigger value="problem">Problem</TabsTrigger>
            <TabsTrigger value="meta">Info</TabsTrigger>
          </TabsList>
          <TabsContent value="problem">
            <ProblemStatement statement={statement} meta={meta} />
          </TabsContent>
          <TabsContent value="meta">
            <Info submission={submission} />
          </TabsContent>
        </Tabs>
        <div className="w-[48%]">
          <Split className="w-[100%] h-[90vh] split" direction="vertical">
            <CodeEditor code={submission?.code} explainCode={explainCode} />
            <Descriptor output={submission?.output?.consoleOP} />
          </Split>
        </div>
        <Explain
          open={openSheet}
          setOpen={setOpenValue}
          code={explainCodeStr}
          responseStr={explainResponse}
          loading={sheetLoading}
          err={sheetError}
        />
      </div>
    </>
  );
};

export default Submission;
