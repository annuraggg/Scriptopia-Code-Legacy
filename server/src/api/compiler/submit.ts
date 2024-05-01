import express from "express";
import runJS from "@/languageTemplates/js.js";
import Problem from "@/schemas/ProblemSchema.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import Submission from "@/schemas/SubmissionSchema.js";
import Case from "@/Interfaces/Case.js";
import logger from "@/config/logger.js";
import ProblemType from "@/Interfaces/Problem";
import generateRecommendation from "@/ml/apriori";
import SubmissionType from "@/Interfaces/Submission";
import generateAssessment from "./assess";
import User from "@/schemas/UserSchema";
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
        const submissions = await Submission.find({
          problemID: probID,
          status: "PASSED",
        });

        // @ts-ignore
        const r: any = await generateRecommendation(req.user.id);
        const sugg = await getSuggestion(r);

        const timeEfficiency: {
          avg: number;
          percent: number;
        } = await getTimeEfficiency(submissions, result.runtime);
        const spaceEfficiency: {
          avg: number;
          percent: number;
        } = await getSpaceEfficiency(submissions, result.memoryUsage);

        const scoreGet:
          | {
              testCaseScore: number;
              timerScore: number;
            }
          | undefined = await generateAssessment(
          code,
          language,
          prob.starterFunction,
          probID,
          timer,
          totalRuns,
          result, // @ts-ignore
          req.user
        );

        // @ts-ignore

        const submission = {
          problemID: probID,
          // @ts-ignore
          userID: req?.user ? (req.user?.id as User) : ({} as User),
          code: code,
          language: language,
          status: "PASSED",
          output: result,
        };

        const { _id } = await Submission.create(submission);

        const user = await User.findById(req.user.id);
        const score = {
          submissionID: _id,
          problemID: probID,
          timerScore: scoreGet?.timerScore,
          testCaseScore: scoreGet?.testCaseScore,
        };

        user?.score.push(score);
        await user?.save();

        res.status(200).json({
          console: "",
          output: result,
          suggestion: sugg,
          timeEfficiency,
          spaceEfficiency,
        });
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

        const user = await User.findById(req.user.id);
        user?.score.push({
          submissionID: probID,
          timerScore: 0,
          testCaseScore: 0,
        });

        Submission.create(submission);
        res.status(200).json({ output: result });
      }
    }
  } catch (error) {
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
  if (!data) {
    return null;
  }

  if (data?.error) {
    return null;
  }

  const id = data?.response?.next_problem?.[0]?.slice(1);
  if (!id) {
    return null;
  }

  const sugg = await Problem.findById(id);
  return sugg;
};

const getTimeEfficiency = async (
  submissions: SubmissionType[],
  currentEfficiency: number
) => {
  let timeArr = submissions.map((sub) => sub.output.runtime);
  timeArr = timeArr.filter((time) => time !== undefined && !isNaN(time)); // Filter out undefined and NaN values
  const totalRuntime = timeArr.reduce((acc, val) => acc + val, 0);
  const avgRuntime = totalRuntime / timeArr.length;
  const efficiencyPercentage = (currentEfficiency / avgRuntime) * 100;

  return {
    avg: avgRuntime,
    percent: efficiencyPercentage,
  };
};

const getSpaceEfficiency = async (
  submissions: SubmissionType[],
  currentEfficiency: number
) => {
  let spaceArr = submissions.map((sub) => sub.output.memoryUsage);
  spaceArr = spaceArr.filter((space) => space !== undefined && !isNaN(space));
  const totalSpace = spaceArr.reduce((acc, val) => acc + val, 0);
  const avgSpace = totalSpace / spaceArr.length;
  const efficiencyPercentage = (currentEfficiency / avgSpace) * 100;

  return {
    avg: avgSpace,
    percent: efficiencyPercentage,
  };
};

export default router;
