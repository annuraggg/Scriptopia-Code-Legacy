import express from "express";
const router = express.Router();
import Problem from "../../schemas/ProblemSchema.js";
import logger from "../../config/logger.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import ProblemType from "@/Interfaces/Problem.js";
import Submission from "@/schemas/SubmissionSchema.js";
import SubmissionType from "@/Interfaces/Submission.js";
import User from "@/schemas/UserSchema.js";

router.post("/:probID", verifyJWT, async (req, res) => {
  try {
    const problem: ProblemType | any = await Problem.findById(
      req.params.probID
    ).exec();

    if (problem) {
      const author = await User.findById(problem.author).exec();

      const meta = {
        id: problem._id,
        title: problem.title,
        difficulty: problem.difficulty.toLowerCase(),
        votes: problem.votes,
        tags: problem.tags,
        author: author?.username,
        authorid: author?._id,
        time: problem.recommendedTime,
        langs: problem.languageSupport,
      };
      const desc = problem.description;
      const cases = problem.testCases;
      const func = problem.starterFunction;
      const args = problem.starterVarArgs;

      const submissions: SubmissionType[] = await Submission.find({
        problemID: req.params.probID,
        // @ts-ignore
        userID: req?.user?.id,
      });

      res.status(200).json({ desc, meta, cases, func, args, submissions });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.post("/:probid/save", async (req, res) => {
  const {
    name,
    time,
    difficulty,
    tags,
    description,
    selectedLanguages,
    functionName,
    returnType,
    args,
    testCases,
  } = req.body;

  if (
    !name ||
    !time ||
    !difficulty ||
    !tags ||
    !description ||
    !selectedLanguages ||
    !functionName ||
    !returnType ||
    !args ||
    testCases.length === 0
  ) {
    return res.status(400).json({ message: "Invalid Request" })
    }


  try {
    const problem = await Problem.findById(req.params.probid).exec();

    if (!problem) {
      return res.status(404).json({ message: "Problem Not Found" });
    }

    problem.title = name;
    problem.recommendedTime = time;
    problem.description = description;
    problem.difficulty = difficulty;
    problem.tags = tags;
    problem.languageSupport = selectedLanguages;
    problem.starterFunction = functionName;
    problem.functionReturn = returnType;
    problem.starterVarArgs = args;
    problem.testCases = testCases;
    
    await problem.save();

    res.status(201).json({ message: "Problem Updated Successfully", id: problem._id});
  } catch (err) {
    logger.error({ code: "PRO_EDI_00", message: err });
    res.status(500).json({ message: "Error Creating Problem" });
  }
});

export default router;
