import { io } from "@/config/init";
import logger from "@/config/logger";
import Screening from "@/schemas/ScreeningSchema";
import express from "express";
const router = express.Router();

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    let rooms = io.sockets.adapter.rooms;
    let room = rooms.get(data.room);

    if (!room) {
      socket.join(data.room);
    } else {
      return;
    }
  });
});

router.post("/", async (req, res) => {
  try {
    const { name, email, screeningId } = req.body;

    if (!name || !email || !screeningId) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if the screening exists
    const screening = await Screening.findById(screeningId);
    if (!screening || !screening.openRange) {
      return res.status(404).json({ message: "Screening not found" });
    }

    if (
      screening.candidates.filter((candidate) => candidate.email === email)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ message: "You are not allowed to take this screening" });
    }

    // Check if the screening is active
    if (screening.openRange.start && screening.openRange.start > new Date()) {
      return res.status(400).json({ message: "Screening is not active" });
    }

    // Check if the screening is closed
    if (screening.openRange.end && screening.openRange.end < new Date()) {
      return res.status(400).json({ message: "Screening is closed" });
    }

    // Check if the user has already taken the screening
    if (screening.takenBy.includes(email)) {
      return res
        .status(400)
        .json({ message: "You have already taken this screening" });
    }

    res.json({ message: "Screening started" });
  } catch (err) {
    logger.error({ code: "SCR_BEG_001", message: err });
    res.status(500).json({ message: "Failed to start screening" });
  }
});

router.post("/handshake", async (req, res) => {
  const { name, email, screeningId } = req.body;
  io.to(email + screeningId).emit("begin", { name, email, screeningId });
  res.json({ message: "Handshake sent" });
});

export default router;
