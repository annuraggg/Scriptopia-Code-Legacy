import express from "express";
const router = express.Router();

import citiesJson from "@/api/assets/cities.json";
import verifyJWT from "@/middlewares/verifyJWT";

router.post("/", verifyJWT, (req, res) => {
  const { search } = req.body;
  let cities = citiesJson.cities.slice(0, 50);
  if (search) {
    cities = citiesJson.cities
      .filter((city) => city.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 50);
  }

  res.json({ cities });
});

export default router;
