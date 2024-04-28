interface Submission extends Document {
  problemID: string;
  userID: string;
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
    info: string;
    consoleOP: string[];
    runtime: number;
    memoryUsage: number;
  };
}

export default Submission;
