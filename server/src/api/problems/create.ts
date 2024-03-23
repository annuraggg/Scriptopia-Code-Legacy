import Problem from "@/schemas/ProblemSchema.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    name,
    time,
    difficulty,
    tags,
    description,
    selectedLanguages,
    functionName,
    returnType,
    args,
    testCases,
  } = req.body;

  if (
    !name ||
    !time ||
    !difficulty ||
    !tags ||
    !description ||
    !selectedLanguages ||
    !functionName ||
    !returnType ||
    !args ||
    !testCases
  ) {
    return res.status(400).json({ message: "Invalid Request" });
  }

  try {
    const prob = await Problem.create({
      title: name,
      // @ts-ignore
      author: req?.user?.id,
      recommendedTime: time,
      description,
      difficulty,
      tags,
      languageSupport: selectedLanguages,
      starterFunction: functionName,
      functionReturn: returnType,
      starterVarArgs: args,
      testCases,
    });

    res
      .status(201)
      .json({ message: "Problem Created Successfully", id: prob._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error Creating Problem" });
  }
});

export default router;
