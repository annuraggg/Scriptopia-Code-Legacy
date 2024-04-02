import verifyJWT from "@/middlewares/verifyJWT";
import Redirect from "@/schemas/RedirectSchema";
import Screening from "@/schemas/ScreeningSchema";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT ,async (req, res) => {
  try {
    const {
      name,
      desc,
      instructions,
      duration,
      openRange,
      questions,
      candidates,
      editorOptions,
      security,
      feedback,
    } = req.body;

    const newScreen = await Screening.create({
      name: name,
      desc: desc,
      instructions: instructions,
      duration: duration,
      createdAt: new Date(),
      // @ts-expect-error
      createdBy: req.user.id,
      openRange: openRange,
      questions: questions,
      candidates: candidates,
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
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
