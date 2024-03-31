import express from "express";
const router = express.Router();

import getStatus from "./getStatus";
import enable from "./enable";
import create from "./create";
import getScreenFromCode from "./getScreenFromCode";

router.use("/getStatus", getStatus);
router.use("/enable", enable);
router.use("/create", create)
router.use("/redirect", getScreenFromCode)

export default router;
