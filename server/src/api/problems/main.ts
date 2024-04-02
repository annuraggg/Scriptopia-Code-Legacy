import express from "express";
const router = express.Router();
import Problem from "../../schemas/ProblemSchema.js";
import logger from "../../config/logger.js";
import create from "./create.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import ProblemType from "@/Interfaces/Problem.js";
import Submission from "@/schemas/SubmissionSchema.js";
import SubmissionType from "@/Interfaces/Submission.js";
import User from "@/schemas/UserSchema.js";
import edit from "./edit.js";

router.use("/create", verifyJWT, create);
router.use("/edit", verifyJWT, edit);

router.post("/:probID", async (req, res) => {
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

      res.status(200).json({ desc, meta, cases, func, args, submissions, returnType: problem.returnType});
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const problems = await Problem.find({}).exec();
    res.status(200).json(problems);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

export default router;
