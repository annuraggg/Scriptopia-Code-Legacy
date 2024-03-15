import express from "express";
import verifyJWT from "@/middlewares/verifyJWT.js";
import UserToken from "@/Interfaces/UserToken.js";
import Problem from "@/schemas/ProblemSchema.js";
import User from "@/schemas/UserSchema.js";
import ProblemType from "@/Interfaces/Problem.js";
const router = express.Router();

const limit = 8;

function compareDates(date1: Date, date2: Date | null): boolean {
  if (date2 === null) return false;
  const isoDate1 = date1.toISOString().split("T")[0];
  const isoDate2 = date2.toISOString().split("T")[0];

  console.log(isoDate1, isoDate2);
  console.log(isoDate1 === isoDate2);
  if (isoDate1 === isoDate2) return true;
  else if (isoDate1 < isoDate2) return false;
  else return false;
}

router.post("/", verifyJWT, async (req, res) => {
  const user = req?.user as UserToken;

  if (!user) {
    return res.status(401).send();
  }

  const excludeIDs = await User.findOne({ _id: user.id }).select(
    "solvedProblems"
  );

  const excludedProblemIDs: string[] = excludeIDs?.solvedProblems.map((obj) =>
    obj.problemId.toString()
  )!;

  const probs = await Problem.find({ _id: { $nin: excludedProblemIDs } }).limit(
    limit
  );

  const furtherExclude = probs.map((obj) => obj._id.toString());

  type Problem = {
    id: string;
    title: string;
    difficulty: string;
    tags: string[];
    lastUpdated: string;
  };

  const problems: Problem[] = probs.map((obj) => {
    return {
      id: obj._id.toString(),
      title: obj.title,
      difficulty: obj.difficulty,
      tags: obj.tags,
      lastUpdated: obj.lastUpdated.toDateString(),
    };
  });

  // Calculate Pagination
  const totalProblems = await Problem.countDocuments({
    _id: { $nin: excludedProblemIDs },
  });

  const pages = Math.ceil(totalProblems / limit);

  // GET Codeflow
  const userObj = await User.findOne({ _id: user.id }).select("streak");
  const streak = userObj?.streak;

  const streakArr: boolean[] = [];
  if (streak) {
    let day = 0;
    for (let i = 7; i > 0; i--) {
      const date = new Date(new Date().setDate(new Date().getDate() - day))
        .toISOString()
        .toString();

      day++;
      const date2 = streak[i] ? new Date(streak[i]) : null;
      streakArr.push(compareDates(new Date(date), date2));
    }
  }

  console.log(streakArr);

  res.status(200).json({
    problems,
    exclude: [...excludedProblemIDs, ...furtherExclude],
    pages,
    streak: streakArr,
  });
});

router.post("/page", verifyJWT, async (req, res) => {
  const user = req?.user as UserToken;

  if (!user) {
    return res.status(401).send();
  }

  const excludedProblemIDs = req.body.exclude;

  const page = req.body.page;
  const probs = await Problem.find({ _id: { $nin: excludedProblemIDs } })
    .limit(limit)
    .skip((page - 1) * limit);

  const furtherExclude = probs.map((obj) => obj._id.toString());

  type Problem = {
    id: string;
    title: string;
    difficulty: string;
    tags: string[];
    lastUpdated: string;
  };

  const problems: Problem[] = probs.map((obj) => {
    return {
      id: obj._id.toString(),
      title: obj.title,
      difficulty: obj.difficulty,
      tags: obj.tags,
      lastUpdated: obj.lastUpdated.toDateString(),
    };
  });

  res
    .status(200)
    .json({ problems, exclude: [...excludedProblemIDs, ...furtherExclude] });
});

router.post("/filter", verifyJWT, async (req, res) => {
  const user = req?.user as UserToken;

  if (!user) {
    return res.status(401).send();
  }

  const difficulty: string = req.body.difficulty;
  const search: string = req.body.search;

  let probs: any = [];
  let totalProblems: number = 0;

  if (search !== "") {
    const regex = { $regex: search, $options: "i" };
    probs = await Problem.find({ title: regex }).limit(limit);
    totalProblems = await Problem.countDocuments({ title: regex });
  } else if (difficulty !== "all") {
    probs = await Problem.find({ difficulty: difficulty.toLowerCase() }).limit(
      limit
    );
    totalProblems = await Problem.countDocuments({
      difficulty: difficulty.toLowerCase(),
    });
  } else {
    probs = await Problem.find().limit(limit);
    totalProblems = await Problem.countDocuments();
  }

  const problems: ProblemType[] = probs.map((obj: ProblemType) => {
    return {
      id: obj._id.toString(),
      title: obj.title,
      difficulty: obj.difficulty,
      tags: obj.tags,
      lastUpdated: obj.lastUpdated.toDateString(),
    };
  });

  const pages = Math.ceil(totalProblems / limit);

  res.status(200).json({ problems, pages });
});

export default router;
