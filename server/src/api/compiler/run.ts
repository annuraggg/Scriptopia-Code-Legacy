import express from "express";
import runJS from "@/languageTemplates/js.js";
import Case from "@/Interfaces/Case.js";
import logger from "@/config/logger.js";
import Problem from "@/schemas/ProblemSchema.js";
import ProblemType from "@/Interfaces/Problem.js";
import runJava from "@/languageTemplates/java.js";
const router = express.Router();

const selectLangAndRun = async (
  code: string,
  fn: string,
  cases: Case[],
  language: string,
  prob: ProblemType
) => {
  try {
    switch (language) {
      case "javascript":
        return await runJS(code, fn, cases, prob);
      case "java":
        return await runJava(code, fn, cases, prob);
      default:
        return "Language not supported yet!";
    }
  } catch (error) {
    logger.error({ code: "COMPILER-RUN-SELECTLANGANDRUN", message: error });
    return null;
  }
};

router.post("/", async (req, res) => {
  try {
    const { code, language, cases, fn, probID } = req.body;
    const prob = await Problem.findById(probID);
    if (!prob) {
      res.status(404).send("Problem not found");
      return;
    }

    const sampleCases = cases.filter((c: any) => c?.isSample);

    const result = await selectLangAndRun(code, fn, sampleCases, language, prob);

    if (!result) {
      res.status(500).send("Failed to fetch output");
    } else {
      res.status(200).json({ output: result });
    }
  } catch (error) {
    logger.error({ code: "COMPILER-RUN-ROOT", message: error });
    res.status(500).send();
  }
});

export default router;
