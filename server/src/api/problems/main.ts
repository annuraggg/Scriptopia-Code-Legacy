import express from "express";
const router = express.Router();
import Problem from "../../schemas/ProblemSchema.js";
import logger from "../../config/logger.js";

router.get("/:probID", (req, res) => {
  Problem.findById(req.params.probID)
    .then((problem) => {
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

        res.status(200).json({ desc, meta, cases, func, args });
      }
    })
    .catch((err) => {
      logger.error(err);
      res.status(404).json(err);
    });
});

export default router;
