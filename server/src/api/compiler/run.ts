import express from "express";
import runJS from "@/languageTemplates/js.js";
import Case from "@/Interfaces/Case.js";
import logger from "@/config/logger";
const router = express.Router();

const selectLangAndRun = async (
  code: string,
  fn: string,
  cases: Case[],
  language: string
) => {
  try {
    switch (language) {
      case "javascript":
        return await runJS(code, fn, cases);
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
    const { code, language, cases, fn } = req.body;
    const result = await selectLangAndRun(code, fn, cases, language);

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
