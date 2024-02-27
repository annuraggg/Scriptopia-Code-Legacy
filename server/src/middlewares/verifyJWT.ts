import jwt from "jsonwebtoken";
import express from "express";

const verifyJWT = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(403).send("No token provided");
  } else {
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: Express.User | undefined) => {
      if (err) {
        res.status(403).send("Invalid token");
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

export default verifyJWT;
