import { Navbar } from "@/components/ui/navbar";
import StatementComponent from "./StatementComponent";
import SolutionComponent from "./SolutionComponent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProblemMetaComponent from "./ProblemMetaComponent";
import TestCaseComponent from "./TestCaseComponent";
const CreateProblem = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const goToDetails = () => setCurrPage(2);

  return (
    <>
      <Navbar />
      <div>
        {currPage === 0 ? (
          <div className="flex flex-col gap-5 px-5 h-[90vh] overflow-y-auto items-center justify-center">
            <StatementComponent />
            <Button onClick={goToDetails}>&gt; Problem Details</Button>
          </div>
        ) : currPage === 0 ? (
          <div className="flex flex-col gap-5 px-5 h-[90vh] overflow-y-auto items-center justify-center">
            <ProblemMetaComponent />
            <div className="flex gap-5">
              <Button onClick={() => setCurrPage(0)}>
                &lt; Problem Statement
              </Button>
              <Button onClick={() => setCurrPage(2)}>&gt; Test Cases</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 px-5 h-[90vh] overflow-y-auto items-center justify-center">
            <TestCaseComponent />
            <div className="flex gap-5">
              <Button onClick={() => setCurrPage(1)}>
                &lt; Problem Details
              </Button>
              <Button onClick={() => setCurrPage(3)}>&gt; Submit</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateProblem;
