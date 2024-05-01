import express from "express";
const router = express.Router();

import citiesJson from "@/api/assets/cities.json" with { type: "json" };
import verifyJWT from "@/middlewares/verifyJWT.js";
import logger from "@/config/logger.js";

router.post("/", verifyJWT, (req, res) => {
  try {
    const { search } = req.body;
    let cities = citiesJson.cities.slice(0, 50);
    if (search) {
      cities = citiesJson.cities
        .filter((city) =>
          city.name.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 50);
    }

    res.json({ cities });
  } catch (error) {
    logger.error({ code: "DAT_CIT_001", message: error });
    res.status(500).send();
  }
});

export default router;
