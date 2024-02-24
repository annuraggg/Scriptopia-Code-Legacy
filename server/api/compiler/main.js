import express from "express";
import runJS from "../../languageTemplates/js.js";
const router = express.Router();

const selectLangAndRun = async (code, fn, cases, language) => {
  switch (language) {
    case "javascript":
      return await runJS(code, fn, cases);
    default:
      return "Language not supported yet!";
  }
};

router.post("/run", async (req, res) => {
  const { code, language, cases, fn } = req.body;
  const result = await selectLangAndRun(code, fn, cases, language);

  if (!result) {
    res.status(500).send("Failed to fetch output");
  } else {
    res.status(200).json({ console: "", output: result });
  }
});

export default router;
