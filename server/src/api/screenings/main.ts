import express from "express";
const router = express.Router();

import getStatus from "./getStatus.js";
import enable from "./enable.js";
import create from "./create.js";
import get from "./get.js";
import begin from "./begin.js";
import end from "./end.js";
import result from "./results.js";
import candidate from "./candidate.js";
import update from "./update.js";

router.use("/getStatus", getStatus);
router.use("/enable", enable);
router.use("/create", create);
router.use("/get", get);
router.use("/begin", begin);
router.use("/end", end)
router.use("/results", result)
router.use("/candidate", candidate)
router.use("/update", update)

export default router;
