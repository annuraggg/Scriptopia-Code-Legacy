import express from "express";
const router = express.Router();

import run from "./run.js";
import submit from "./submit.js";
import explain from "./explain.js";

router.use("/run", run);
router.use("/submit", submit);
router.use("/explain", explain)

export default router;
