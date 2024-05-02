import Screening from "@/schemas/ScreeningSchema";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      id,
      name,
      desc,
      access,
      languages,
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

    const trimmedCandidates: {
      name: string;
      email: string;
    }[] = [];

    candidates.forEach((candidate: { name: string; email: string }) => {
      trimmedCandidates.push({
        name: candidate.name,
        email: candidate.email.trim(),
      });
    });

    await Screening.findByIdAndUpdate(
      id,
      {
        name: name,
        desc: desc,
        passPercentage: passingPercentage,
        instructions: instructions,
        duration: duration,
        languages: languages,
        openRange: openRange,
        questions: questions,
        access: access,
        candidates: trimmedCandidates,
        editorOptions: editorOptions,
        security: security,
        feedback: feedback,
      },
      { new: true }
    );

    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

export default router;
