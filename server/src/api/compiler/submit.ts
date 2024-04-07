import express from "express";
import runJS from "@/languageTemplates/js.js";
import Problem from "@/schemas/ProblemSchema.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import Submission from "@/schemas/SubmissionSchema.js";
import Case from "@/Interfaces/Case.js";
import logger from "@/config/logger.js";
import ProblemType from "@/Interfaces/Problem";
import generateAssessment from "./assess";
import generateRecommendation from "@/ml/apriori";
const router = express.Router();

interface User {
  id: string;
  username: string;
  email: string;
}

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

router.post("/", verifyJWT, async (req, res) => {
  try {
    const { code, language, fn, probID, timer, totalRuns } = req.body;
    const prob = await Problem.findById(probID);
    if (!prob) {
      res.status(404).send("Problem not found");
      return;
    }

    const cases: Case[] = await fetchCases(prob);

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
    } = await selectLangAndRun(code, fn, cases, language, prob);

    if (!result) {
      res.status(500).send("Failed to fetch output");
    } else {
      if (
        result.internalStatus === "PASSED" &&
        result.failedCaseNumber === -1
      ) {
        const submission = {
          problemID: probID,
          // @ts-ignore
          userID: req?.user ? (req.user?.id as User) : ({} as User),
          code: code,
          language: language,
          status: "PASSED",
          output: result,
        };

        /*generateAssessment(
          code,
          language,
          fn,
          probID,
          timer,
          totalRuns,
          result,
          // @ts-ignore
          req.user
        );*/

        Submission.create(submission);

        // @ts-ignore
        const r: any = await generateRecommendation(req.user.id);
        const sugg = await getSuggestion(r);

        res.status(200).json({ console: "", output: result, suggestion: sugg });
      } else {
        const submission = {
          problemID: probID,
          // @ts-ignore
          userID: req.user.id as User,
          code: code,
          language: language,
          status: "FAILED",
          output: result,
        };

        Submission.create(submission);
        res.status(200).json({ output: result });
      }
    }
  } catch (error) {
    console.log(error);
    logger.error({ code: "COMPILER-SUBMIT-ROOT", message: error });
    res.status(500).send();
  }
});

const fetchCases = async (probID: ProblemType): Promise<Case[]> => {
  try {
    const cases = probID ? probID.testCases : [];
    return cases as Case[];
  } catch (error) {
    logger.error({ code: "COMPILER-SUBMIT-FETCHCASES", message: error });
    return [];
  }
};

const getSuggestion = async (data: {
  error: boolean;
  response: {
    next_problem: string[];
    error?: string;
    confidence?: number;
  };
}) => {
  console.log(data);
  if (!data) {
    return null;
  }

  if (data?.error) {
    return null;
  }

  const id = data.response.next_problem[0]?.slice(1);
  const sugg = await Problem.findById(id);
  return sugg;
};

export default router;
