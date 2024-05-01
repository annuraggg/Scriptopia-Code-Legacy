import logger from "@/config/logger.js";
import Case from "@/Interfaces/Case.js";
import runJS from "@/languageTemplates/js.js";
import Problem from "@/schemas/ProblemSchema.js";
import ScreeningSubmission from "@/schemas/screeningSubmissionsSchema.js";
import ProblemType from "@/Interfaces/Problem.js";
import express from "express";
import Screening from "@/schemas/ScreeningSchema.js";
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
    logger.error({ code: "SCR-END-001", message: error });
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
  const submissionResults = [];
  const screening = await Screening.findById(screeningID);

  console.log("SESSION URL : ", sessionUrl);

  if (!screening) {
    return res.status(404).json({ message: "No screening found" });
  }

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
      problem?.testCases,
      sub?.lang,
      problem
    );

    let score = 0;
    if (result.status === "PASSED") {
      score = 1;
    }

    let percent = (score / screening?.questions?.length) * 100;

    const finalObj = {
      problemId: sub.probID,
      submission: sub,
      result,
      score: percent,
    };
    submissionResults.push(finalObj);
  }

  let timeTaken = 0;
  submissionResults.forEach((sub) => {
    timeTaken += sub.submission.totalTime;
  });


  ScreeningSubmission.create({
    userName: name,
    userEmail: email,
    submission: submissionResults,
    sessionUrl: sessionUrl,
    screeningId: screeningID,
    timeTaken: timeTaken,
    status: "completed",
  })
    .then(() => {
      res.status(200).send("Screening ended successfully");
    })
    .catch((err) => {
      logger.error({ code: "SCR_END_002", message: err });
      res.status(500).send("Error ending screening");
    });
});

export default router;
