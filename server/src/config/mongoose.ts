import mongoose from "mongoose";
import logger from "./logger.js";

mongoose
  .connect(
    "mongodb+srv://annuragggg:RMQVlqvpszY9XEzf@mainserver.js8thqj.mongodb.net/scriptopia"
  )
  .then(() => {
    logger.info({ code: "MONGOOSE-CONNECT", message: "Connected to MongoDB" });
  })
  .catch((err) => {
    logger.error({ code: "MONGOOSE-CONNECT", message: err });
  });
