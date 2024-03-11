import { Navbar } from "@/components/ui/navbar";
import StatementComponent from "./StatementComponent";
import { useState } from "react";
import ProblemMetaComponent from "./ProblemMetaComponent";
import TestCaseComponent from "./TestCaseComponent";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";

const CreateProblem = () => {
  const [currPage, setCurrPage] = useState<number>(0);
  const [statement, setStatement] = useState<any>(null);
  const [meta, setMeta] = useState<{
    title: string;
    difficulty: string;
    tags: string[];
    functionName: string;
    args: { key: string; type: string }[];
  } | null>(null);
  const [cases, setCases] = useState<{ input: string; output: string }[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const getStatement = (statement: any) => {
    setStatement(statement);
    setCurrPage(1);
  };

  const goBack = (current: number) => {
    setCurrPage(current - 1);
  };

  const getMeta = (meta: {
    title: string;
    difficulty: string;
    tags: string[];
    functionName: string;
    args: { key: string; type: string }[];
  }) => {
    setMeta(meta);
    setCurrPage(2);
  };

  const getCases = (casesArr: { input: string; output: string }[]) => {
    setCases(casesArr);
    if (statement.blocks.length === 0) {
      toast.error("Please enter the problem statement");
      return;
    }

    if (
      !meta?.title ||
      !meta?.difficulty ||
      !meta?.tags ||
      !meta?.functionName ||
      !meta?.args
    ) {
      toast.error("Please enter the problem meta");
      return;
    }

    if (casesArr.length === 0) {
      toast.error("Please enter at least one test case");
      return;
    }

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/problems/create`, {
        statement,
        meta,
        cases: casesArr,
      })
      .then((res) => {
        toast.success("Problem Created Successfully");
        window.location.href = "/editor/" + res.data.id;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Please login to create a problem");
          return;
        }
        if (err.res.data.status === 400) {
          toast.error("Please fill all the fields");
          return;
        }

        toast.error("Error Creating Problem");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div>
        {currPage === 0 ? (
          <div className="flex flex-col gap-5 px-5 h-[90vh] overflow-y-auto items-center justify-center">
            <StatementComponent getStatement={getStatement} data={statement} />
          </div>
        ) : currPage === 1 ? (
          <div className="flex flex-col gap-5 px-5 h-[90vh] overflow-y-auto items-center justify-center">
            <ProblemMetaComponent
              getMeta={getMeta}
              goBack={goBack}
              data={meta}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-5 px-5 h-[90vh] overflow-y-auto items-center justify-center">
            <TestCaseComponent
              getCases={getCases}
              goBack={goBack}
              data={cases}
            />
            <div className="flex gap-5"></div>
          </div>
        )}

        <AlertDialog open={loading}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription className="flex items-center justify-center flex-col gap-5">
                <p>Please Wait</p>
                <ReloadIcon className="animate-spin" />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default CreateProblem;
