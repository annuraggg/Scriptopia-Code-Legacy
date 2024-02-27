import express from "express";
import runJS from "@/languageTemplates/js.js";
import Case from "@/Interfaces/Case.js";
const router = express.Router();

const selectLangAndRun = async (code: string, fn: string, cases: Case[] , language: string) => {
  switch (language) {
    case "javascript":
      return await runJS(code, fn, cases);
    default:
      return "Language not supported yet!";
  } 
};

router.post("/", async (req, res) => {
  const { code, language, cases, fn } = req.body;
  const result = await selectLangAndRun(code, fn, cases, language);

  if (!result) {
    res.status(500).send("Failed to fetch output");
  } else {
    res.status(200).json({ output: result });
  }
});

export default router;
