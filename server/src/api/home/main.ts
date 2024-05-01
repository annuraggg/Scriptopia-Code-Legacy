import express from "express";
import verifyJWT from "@/middlewares/verifyJWT.js";
import UserToken from "@/Interfaces/UserToken.js";
import Problem from "@/schemas/ProblemSchema.js";
import User from "@/schemas/UserSchema.js";
import ProblemType from "@/Interfaces/Problem.js";
import logger from "@/config/logger.js";
import generateRecommendation from "@/ml/apriori.js";
const router = express.Router();

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  tags: string[];
  lastUpdated: string;
};

const limit = 8;

router.post("/", verifyJWT, async (req, res) => {
  try {
    const user = req?.user as UserToken;

    if (!user) {
      return res.status(401).send();
    }

    const excludeIDs = await User?.findOne({ _id: user?.id })?.select(
      "solvedProblems"
    );

    const excludedProblemIDs: string[] = excludeIDs?.solvedProblems?.map((obj) =>
      obj?.problemId?.toString()
    )!;

    const probs = await Problem?.find({
      _id: { $nin: excludedProblemIDs },
    })?.limit(limit);

    const problems: Problem[] = probs?.map((obj) => {
      return {
        id: obj?._id?.toString(),
        title: obj?.title,
        difficulty: obj?.difficulty,
        tags: obj?.tags,
        lastUpdated: obj?.lastUpdated?.toDateString(),
      };
    });

    // Calculate Pagination
    const totalProblems = await Problem?.countDocuments({
      _id: { $nin: excludedProblemIDs },
    });

    // @ts-ignore
    const recc: {
      error: boolean;
      response: {
        next_problem: string[];
        error?: string;
        confidence?: number;
      };
    } = await generateRecommendation(user?.id);

    const rc: ProblemType[] | null = await getSuggestions(recc);

    let recommendedProblems: {
      id: string;
      title: string;
      difficulty: string;
      tags: string[];
      lastUpdated: string;
    }[] = [];

    if (rc) {
      // @ts-ignore
      recommendedProblems = rc?.map((obj) => {
        return {
          id: obj?._id?.toString(),
          title: obj?.title,
          difficulty: obj?.difficulty,
          tags: obj?.tags,  
          lastUpdated: obj?.lastUpdated?.toDateString(),
        };
      });
    }

    const furtherExclude = problems?.map((obj) => obj?.id);
    const evenFurtherExclude =  recc?.response?.next_problem?.map((prob) =>
      prob?.slice(1)
    ) || [];

    const pages = Math?.ceil(totalProblems / limit);
    const userObj = await User?.findOne({ _id: user?.id });
    const streak = userObj?.streak;

    let allProbs: Problem[] = [];
    if (recommendedProblems) {
      allProbs = [...recommendedProblems];
      problems?.forEach((prob) => {
        if (allProbs?.includes(prob)) {
          return;
        }
        allProbs?.push(prob);
      });
    } else {
      allProbs = problems;
    }

    allProbs = allProbs?.slice(0, limit);

    const totalSolvedProblems = userObj?.solvedProblems?.length || 0;

    if (streak) {
      const newStreakArr = streak?.map((date) => convertToRequiredFormat(date));
      const codeFlow = compareDatesWithStreak(newStreakArr);
      res?.status(200)?.json({
        problems: allProbs,
        pages,
        exclude: [
          ...evenFurtherExclude,
          ...excludedProblemIDs,
          ...furtherExclude,
        ],
        streak: codeFlow,
        tsp: totalSolvedProblems,
      });
    }
  } catch (error) {
    console.log(error);
    logger.error({ code: "HOM_GET_001", message: error });
    res.status(500).send();
  }
});

router.post("/page", verifyJWT, async (req, res) => {
  try {
    const user = req?.user as UserToken;

    if (!user) {
      return res.status(401).send();
    }

    const excludedProblemIDs = req?.body?.exclude;
    const probs = await Problem?.find({
      _id: { $nin: excludedProblemIDs },
    })?.limit(limit);

    const furtherExclude = probs?.map((obj) => obj?._id?.toString());

    type Problem = {
      id: string;
      title: string;
      difficulty: string;
      tags: string[];
      lastUpdated: string;
    };

    const problems: Problem[] = probs?.map((obj) => {
      return {
        id: obj?._id?.toString(),
        title: obj?.title,
        difficulty: obj?.difficulty,
        tags: obj?.tags,
        lastUpdated: obj?.lastUpdated?.toDateString(),
      };
    });

    res
      .status(200)
      .json({ problems, exclude: [...excludedProblemIDs, ...furtherExclude] });
  } catch (error) {
    logger.error({ code: "HOM_GET_002", message: error });
    res.status(500).send();
  }
});

router.post("/filter", verifyJWT, async (req, res) => {
  try {
    const user = req?.user as UserToken;

    if (!user) {
      return res.status(401).send();
    }

    const difficulty: string = req?.body?.difficulty;
    const search: string = req?.body?.search;

    let probs: any = [];
    let totalProblems: number = 0;

    if (search !== "") {
      const regex = { $regex: search, $options: "i" };
      probs = await Problem?.find({ title: regex })?.limit(limit);
      totalProblems = await Problem?.countDocuments({ title: regex });
    } else if (difficulty !== "all") {
      probs = await Problem?.find({
        difficulty: difficulty?.toLowerCase(),
      })?.limit(limit);
      totalProblems = await Problem?.countDocuments({
        difficulty: difficulty?.toLowerCase(),
      });
    } else {
      probs = await Problem?.find()?.limit(limit);
      totalProblems = await Problem?.countDocuments();
    }

    const problems: ProblemType[] = probs?.map((obj: ProblemType) => {
      return {
        id: obj?._id?.toString(),
        title: obj?.title,
        difficulty: obj?.difficulty,
        tags: obj?.tags,
        lastUpdated: obj?.lastUpdated?.toDateString(),
      };
    });

    const pages = Math?.ceil(totalProblems / limit);

    res.status(200).json({ problems, pages });
  } catch (error) {
    logger.error({ code: "HOM_GET_003", message: error });
    res.status(500).send();
  }
});

function getCurrentWeekDates() {
  const today = new Date();
  const currentDay = today?.getDay();
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek?.setDate(
    today?.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
  );
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfWeek);
    date?.setDate(date?.getDate() + i);
    dates?.push(date?.toISOString()?.substring(0, 10));
  }
  return dates;
}

function compareDatesWithStreak(streakArr: string[]): number[] {
  const currentWeekDates = getCurrentWeekDates();
  const lastSevenStreakDates = streakArr;
  const streakArrResult: number[] = [];
  currentWeekDates?.forEach((date) => {
    const index = lastSevenStreakDates?.indexOf(date);
    if (index > -1) {
      streakArrResult?.push(1);
    } else if (new Date(date) > new Date()) {
      streakArrResult?.push(-1);
    } else {
      streakArrResult?.push(0);
    }
  });
  return streakArrResult;
}

function convertToRequiredFormat(dateString: string) {
  const date = new Date(dateString);
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, "0");
  const day = String(date?.getDate())?.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const getSuggestions = async (data: {
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

  const probArr: ProblemType[] = [];

  if (data?.response?.next_problem) {
    for (const prob of data?.response?.next_problem) {
      const id = prob?.slice(1);
      const problem = await Problem?.findById(id);
      if (problem) {
        probArr?.push(problem);
      }
    }
  }

  return probArr;
};

export default router;
