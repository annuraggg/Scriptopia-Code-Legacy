import Problem from "@/schemas/ProblemSchema";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    statement,
    meta,
    cases,
  }: {
    statement: any;
    meta: {
      title: string;
      difficulty: string;
      tags: string[];
      functionName: string;
      args: { key: string; type: string }[];
    };
    cases: { input: string; output: string }[];
  } = req.body;
  if (!statement || !meta || !cases) {
    return res.status(400).json({ message: "Invalid Request" });
  }

  try {
    const prob = await Problem.create({
      title: meta.title,
      description: statement, //@ts-ignore
      author: req?.user?.id,
      category: "uncategorized",
      difficulty: meta.difficulty,
      tags: meta.tags,
      votes: 0,
      starterFunction: meta.functionName,
      starterVarArgs: meta.args,
      testCases: cases,
    });

    res.status(201).json({ message: "Problem Created Successfully", id: prob._id });
  } catch (err) {
    res.status(500).json({ message: "Error Creating Problem" });
  }
});

export default router;
