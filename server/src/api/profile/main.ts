import verifyJWT from "@/middlewares/verifyJWT";
import Problem from "@/schemas/ProblemSchema";
import User from "@/schemas/UserSchema";
import express from "express";
const router = express.Router();
import picture from "./picture";
import update from "./update";

router.post("/", verifyJWT, async (req, res) => {
  // @ts-ignore
  const user = await User.findById(req?.user?.id);

  const problems = await Problem.find();
  const easy = problems.filter((problem) => problem.difficulty === "easy");
  const medium = problems.filter((problem) => problem.difficulty === "medium");
  const hard = problems.filter((problem) => problem.difficulty === "hard");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!problems) {
    return res.status(404).json({ message: "Problems not found" });
  }

  let solvedEasy = 0;
  let solvedMedium = 0;
  let solvedHard = 0;

  for (const submission of user.score) {
    const problem = await Problem.findById(submission.problemID);

    if (!problem) {
      console.log("Problem not found");
      continue;
    }

    if (problem.difficulty === "easy") {
      solvedEasy++;
    } else if (problem.difficulty === "medium") {
      solvedMedium++;
    } else if (problem.difficulty === "hard") {
      solvedHard++;
    }
  }

  const dataObj = {
    totalProblems: {
      easy: easy.length,
      medium: medium.length,
      hard: hard.length,
    },
    solvedProblems: {
      easy: solvedEasy,
      medium: solvedMedium,
      hard: solvedHard,
    },
  };
  
  return res.status(200).json({ user, data: dataObj });
});

router.use("/picture", picture);
router.use("/update", update);

export default router;
