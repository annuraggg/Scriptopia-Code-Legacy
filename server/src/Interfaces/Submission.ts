import { Document, Schema, Types } from "mongoose";

interface Submission extends Document {
  problemID: Types.ObjectId;
  userID: Types.ObjectId;
  code: string;
  language: string;
  status: string;
  output: {
    timeStamp: number;
    status: string;
    internalStatus: string;
    failedCaseNumber: number;
    failedCase: {
      name: string;
      difficulty: string;
      score: number;
      input: string;
      output: string;
    };
    error: string;
    language: string;
    info: string;
    consoleOP: string[];
    runtime: number;
    memoryUsage: number;
  };
}

export default Submission;
