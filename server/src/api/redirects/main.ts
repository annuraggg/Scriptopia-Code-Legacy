import logger from "@/config/logger";
import Redirect from "@/schemas/RedirectSchema";
import express from "express";
const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const realURI = await Redirect.findOne({ from: code });
    if (!realURI) {
      return res.status(404).json({ error: "Not found" });
    }
    const url = realURI.to;
    return res.json({ url: url });
  } catch (err) {
    logger.error({ code: "RED_MAI_001", message: err });
    return res.status(500).json({ error: "Failed to redirect" });
  }
});

export default router;
