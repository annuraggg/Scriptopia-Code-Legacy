import Redirect from "@/schemas/RedirectSchema";
import express from "express";
const router = express.Router();

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  const realURI = await Redirect.findOne({ from: code });
  if (!realURI) {
    return res.status(404).json({ error: "No such screening found" });
  }

  console.log("THEN");
  const url = realURI.to;
  console.log(url);
  return res.json({ url: url });
});

export default router;
