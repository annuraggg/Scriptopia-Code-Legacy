import logger from "@/config/logger";
import verifyJWT from "@/middlewares/verifyJWT";
import Problem from "@/schemas/ProblemSchema";
import Submission from "@/schemas/SubmissionSchema";
import User from "@/schemas/UserSchema";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  // @ts-ignore
  const id = req?.user?.id;

  try {
    const submission = await Submission.findOne({ _id: req.body.id });
    const problem = await Problem.findOne({ _id: submission?.problemID });

    const author = await User.findOne({ _id: problem?.author });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    if (problem) {
      const meta = {
        id: problem._id,
        title: problem.title,
        difficulty: problem.difficulty.toLowerCase(),
        votes: problem.votes,
        tags: problem.tags,
        author: author.username,
      };
      const desc = problem.description;
      res.status(200).json({ desc, meta, submission });
    }
  } catch (err) {
    logger.error({ code: "SUB_MAI_001", message: err });
  }
});

export default router;
