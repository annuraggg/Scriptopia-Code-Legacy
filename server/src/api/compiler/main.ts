import express from "express";
const router = express.Router();

import run from "./run.js";
import submit from "./submit.js";

router.use("/run", run);
router.use("/submit", submit);

export default router;
