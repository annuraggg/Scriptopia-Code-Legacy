import UserToken from "@/Interfaces/UserToken.js";
import Problem from "@/schemas/ProblemSchema.js";

const generateAssessment = async (
  _code: string,
  _language: string,
  _fn: string,
  probID: string,
  timer: number,
  _totalRuns: number,
  result: any,
  _user: UserToken
) => {
  try {
    const prob = await Problem.findOne({ _id: probID });
    let testCaseScore = 0;

    if (!prob) {
      console.log("Problem not found");
      return;
    }

    if (result.internalStatus === "PASSED" && result.failedCaseNumber === -1) {
      const score = prob.testCases.reduce((acc, curr) => {
        return acc + curr.score;
      }, 0);

      testCaseScore = score;
    } else {
      const score = prob.testCases.reduce((acc, curr) => {
        if (curr === result.failedCaseNumber) {
          return acc;
        }
        return acc + curr.score;
      }, 0);

      testCaseScore = score;
    }

    let timerScore = 0;
    const recommendedTime = prob?.recommendedTime;
    if (timer <= recommendedTime) {
      timerScore += 5;
    }

    return {
      testCaseScore,
      timerScore,
    }
  } catch (error) {
    console.log(error);
  }
};

export default generateAssessment;
