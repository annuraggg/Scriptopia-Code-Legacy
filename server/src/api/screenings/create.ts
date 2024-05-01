import logger from "@/config/logger.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import Redirect from "@/schemas/RedirectSchema.js";
import Screening from "@/schemas/ScreeningSchema.js";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  try {
    const {
      name,
      desc,
      access,
      passingPercentage,
      instructions,
      duration,
      openRange,
      questions,
      candidates,
      editorOptions,
      security,
      feedback,
    } = req.body;

    const trimmedCandidates = []
    candidates.forEach((candidate) => {
      trimmedCandidates.push({
        name: candidate.name,
        email: candidate.email.trim(),
      });
    });

    const newScreen = await Screening.create({
      name: name,
      desc: desc,
      passPercentage: passingPercentage,
      instructions: instructions,
      duration: duration,
      createdAt: new Date(),
      // @ts-expect-error
      createdBy: req.user.id,
      openRange: openRange,
      questions: questions,
      access: access,
      candidates: trimmedCandidates,
      editorOptions: editorOptions,
      security: security,
      feedback: feedback,
    });

    const shortLink = Math.random().toString(36).substring(7);
    await Redirect.create({
      from: shortLink,
      to: `/screenings/${newScreen._id}`,
    });

    res.status(200).json({ link: shortLink });
  } catch (err) {
    logger.error({ code: "SCR_CRE_001", message: err });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
