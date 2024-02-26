import bodyParser from "body-parser";
import cors from "cors";
import expressSession from "express-session";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

import "./logger.js";
import "./mongoose.js";

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: [process.env.FRONTEND_URL!],
    credentials: true,
  }
));
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
  })
);

export default app;
