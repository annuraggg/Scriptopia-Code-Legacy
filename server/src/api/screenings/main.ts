import express from "express";
const router = express.Router();
import getStatus from "./getStatus";
import enable from "./enable";

router.use("/getStatus", getStatus);
router.use("/enable", enable);

export default router;
