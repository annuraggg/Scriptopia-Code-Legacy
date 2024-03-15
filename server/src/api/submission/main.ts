import logger from "@/config/logger";
import verifyJWT from "@/middlewares/verifyJWT";
import Problem from "@/schemas/ProblemSchema";
import Submission from "@/schemas/SubmissionSchema";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  // @ts-ignore
  const id = req?.user?.id;

  try {
    const submission = await Submission.findOne({ _id: req.body.id });
    const problem = await Problem.findOne({ _id: submission?.problemID });

    if (problem) {
      const meta = {
        id: problem._id,
        title: problem.title,
        difficulty: problem.difficulty.toLowerCase(),
        votes: problem.votes,
        tags: problem.tags,
      };
      const desc = problem.description;
      res.status(200).json({ desc, meta, submission });
    }
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
});

export default router;
