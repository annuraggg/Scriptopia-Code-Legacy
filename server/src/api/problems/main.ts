import express from "express";
const router = express.Router();
import Problem from "../../schemas/ProblemSchema.js";
import logger from "../../config/logger.js";
import create from "./create.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import ProblemType from "@/Interfaces/Problem.js";
import Submission from "@/schemas/SubmissionSchema.js";
import SubmissionType from "@/Interfaces/Submission.js";

router.use("/create", verifyJWT, create);

router.post("/:probID", verifyJWT, async (req, res) => {
  try {
    const problem: ProblemType | any = await Problem.findById(
      req.params.probID
    ).exec();

    if (problem) {
      const meta = {
        id: problem._id,
        title: problem.title,
        difficulty: problem.difficulty.toLowerCase(),
        votes: problem.votes,
        tags: problem.tags,
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

export default router;
