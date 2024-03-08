import React from "react";

const AssessmentStart = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="border border-red-500 h-[80vh] w-[90vw] rounded">
        <div className="flex w-[20vw] bg-secondary h-full">
          <div className="p-5">
            <img src="/assets/img/logo.svg" className="w-[100px] mb-5" />
            <p className="mb-5">Time: 30mins</p>
            <div>
              <h5>Instructions: </h5>
              <p className="text-sm text-gray-400">
                Start your answer with "Generally speaking, I think that".
                Please carefully follow all instructions and do not seek help
                from any external resources. Your assessment results will be
                carefully considered by Coderbyte Testing as part of their
                evaluation process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentStart;
