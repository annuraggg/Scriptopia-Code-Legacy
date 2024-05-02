import express from "express";
const router = express.Router();

import get from "./get.js";
import join from "./join.js";
import create from "./create.js";
import candidate from "./candidate.js";
import admin from "./admin.js";
import screener from "./screener.js";
import edit from "./edit.js";

router.use("/get", get);
router.use("/join", join);
router.use("/create", create);
router.use("/candidate", candidate);
router.use("/admin", admin);
router.use("/screener", screener);
router.use("/edit", edit)

export default router;
