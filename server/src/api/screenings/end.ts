import logger from "@/config/logger";
import Case from "@/Interfaces/Case";
import runJS from "@/languageTemplates/js";
import Problem from "@/schemas/ProblemSchema";
import ScreeningSubmission from "@/schemas/screeningSubmissionsSchema";
import ProblemType from "@/Interfaces/Problem";
import express from "express";
const router = express.Router();

const selectLangAndRun = async (
  code: string,
  fn: string,
  cases: Case[],
  language: string,
  prob: ProblemType
): Promise<{
  timeStamp: string;
  status: string;
  output: string[];
  internalStatus: string;
  failedCaseNumber: number;
  failedCase: Case;
  error: string;
  language: string;
  info: string;
  consoleOP: string[];
  runtime: number;
  memoryUsage: number;
}> => {
  try {
    switch (language) {
      case "javascript":
        const result = await runJS(code, fn, cases, prob);
        return (
          result || {
            timeStamp: "",
            status: "FAILED",
            output: [],
            internalStatus: "FAILED",
            failedCaseNumber: -1,
            failedCase: {} as Case,
            error: "Internal error",
            language: "unsupported",
            info: "",
            consoleOP: [],
            runtime: 0,
            memoryUsage: 0,
          }
        );
      default:
        return {
          timeStamp: "",
          status: "FAILED",
          output: [],
          internalStatus: "FAILED",
          failedCaseNumber: -1,
          failedCase: {} as Case,
          error: "Language not supported yet!",
          language: "unsupported",
          info: "",
          consoleOP: [],
          runtime: 0,
          memoryUsage: 0,
        };
    }
  } catch (error) {
    logger.error({ code: "COMPILER-SUBMIT-SELECTLANGANDRUN", message: error });
    return {
      timeStamp: "",
      status: "FAILED",
      output: [],
      internalStatus: "FAILED",
      failedCaseNumber: -1,
      failedCase: {} as Case,
      error: "Internal error",
      language: "unsupported",
      info: "",
      consoleOP: [],
      runtime: 0,
      memoryUsage: 0,
    };
  }
};

router.post("/", async (req, res) => {
  const { email, name, sessionUrl, screeningID, submission } = req.body;
  console.log(submission);
  const submissionResults = [];

  for (const sub of submission) {
    const problem = await Problem.findById(sub.probID);
    const result: {
      timeStamp: string;
      status: string;
      output: string[];
      internalStatus: string;
      failedCaseNumber: number;
      error: string;
      language: string;
      info: string;
      consoleOP: string[];
      runtime: number;
      memoryUsage: number;
      failedCase: Case;
    } = await selectLangAndRun(
      sub.code,
      // @ts-expect-error
      problem?.starterFunction,
      problem?.functionReturn,
      sub?.lang,
      problem
    );

    const finalObj = {
      problemId: sub.probID,
      submission: sub,
      result,
    };

    submissionResults.push(finalObj);
  }

  ScreeningSubmission.create({
    userName: name,
    userEmail: email,
    submission: submissionResults,
    sessionUrl,
    screeningId: screeningID,
    status: "completed",
  })
    .then(() => {
      res.status(200).send("Screening ended successfully");
    })
    .catch(() => {
      res.status(500).send("Error ending screening");
    });
});

export default router;
