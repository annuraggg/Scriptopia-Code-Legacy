import logger from "@/config/logger";
import verifyJWT from "@/middlewares/verifyJWT";
import Screening from "@/schemas/ScreeningSchema";
import express from "express";
const router = express.Router();

router.post("/my", verifyJWT, async (req, res) => {
  try {
    // @ts-expect-error
    const screenings = await Screening.find({ createdBy: req.user.id });
    res.json(screenings);
  } catch (err) {
    logger.error({ code: "SCR_GET_001", message: err });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/given", verifyJWT, async (req, res) => {
  try {
    const screenings = await Screening.find({
      // @ts-expect-error
      "candidates.email": req.user.email,
    });
    res.json(screenings);
  } catch (err) {
    logger.error({ code: "SCR_GET_002", message: err });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const screening = await Screening.findById(req.params.id);
    res.json(screening);
  } catch (err) {
    logger.error({ code: "SCR_GET_003", message: err });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
