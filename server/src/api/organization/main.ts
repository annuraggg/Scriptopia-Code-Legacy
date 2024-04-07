import express from "express";
const router = express.Router();

import get from "./get";
import join from "./join";
import create from "./create";
import candidate from "./candidate";
import admin from "./admin";
import screener from "./screener";

router.use("/get", get);
router.use("/join", join);
router.use("/create", create);
router.use("/candidate", candidate);
router.use("/admin", admin);
router.use("/screener", screener);

export default router;
