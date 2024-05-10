import verifyJWT from "@/middlewares/verifyJWT.js";
import Screening from "@/schemas/ScreeningSchema.js";
import ScreeningSubmission from "@/schemas/screeningSubmissionsSchema.js";
import express from "express";
import mongoose from "mongoose";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  const { screeningId } = req.body;
  
  const screening = await Screening.findById(screeningId);
  const screenings = await ScreeningSubmission.find({ screeningId });

  if (!screenings) {
    return res.status(404).json({ message: "No submissions found" });
  }

  const resArr: {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    status: string;
    assessmentDate: Date;
    timeTaken: number;
    score: number;
    cheating: number;
  }[] = [];
  screenings.forEach((cand) => {
    let totalTime = 0;
    let score = 0;
    let cheats = 0;

    // @ts-ignore
    cand.submission.forEach((sub) => {
      totalTime += sub.submission.totalTime;
      cheats += sub.submission.tabChange;
      cheats += sub.submission.paste;
    });

    let totalScore = 0;

    const resObj = {
      id: cand._id,
      name: cand.userName,
      email: cand.userEmail,
      status: cand.status,
      assessmentDate: cand.createdAt,
      timeTaken: totalTime,
      score: totalScore,
      cheating: cheats,
    };

    resArr.push(resObj);
  });

  res.json({
    data: resArr,
    screening: screening
  });
});

export default router;
