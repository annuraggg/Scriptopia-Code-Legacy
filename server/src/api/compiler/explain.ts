import verifyJWT from "@/middlewares/verifyJWT.js";
import express from "express";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import logger from "@/config/logger.js";

const router = express.Router();

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
  stopSequences: ["Note"],
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

router.post("/", verifyJWT, async (req, res) => {
  const { code } = req.body;
  const appendTemplate = "Just Explain the Following Code DO NOT COMPLETE IT: ";

  try {
    if (code) {
      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const result = await chat.sendMessage(`${appendTemplate} ${code}`);
      const response = result.response;
      const toText = response.text();

      res.status(200).json({ response: toText });
    }
  } catch (error) {
    logger.error({ code: "COM_EXP_001", message: error });
    res.status(500).json({ message: "Something went wrong!" });
  }
});

export default router;
