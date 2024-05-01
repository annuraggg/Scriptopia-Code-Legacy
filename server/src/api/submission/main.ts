import logger from "@/config/logger.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import Problem from "@/schemas/ProblemSchema.js";
import Submission from "@/schemas/SubmissionSchema.js";
import User from "@/schemas/UserSchema.js";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
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

router.post("/delete", verifyJWT, async (req, res) => {
  const { id } = req.body;

  try {
    const submission = await Submission.findOne({ _id: id });
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // @ts-ignore
    if (submission.userID.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Submission.deleteOne({ _id: id });
    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (err) {
    logger.error({ code: "SUB_MAI_002", message: err });
  }
});

export default router;
