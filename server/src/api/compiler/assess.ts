import UserToken from "@/Interfaces/UserToken";
import Problem from "@/schemas/ProblemSchema";
import Submission from "@/schemas/SubmissionSchema";

const generateAssessment = async (
  code: string,
  language: string,
  fn: string,
  probID: string,
  timer: number,
  totalRuns: number,
  result: any,
  user: UserToken
) => {
  try {
    console.log("RAW DATA: ");
    console.log({
      code,
      language,
      fn,
      probID,
      timer,
      totalRuns,
      result,
      user,
    });

    const prob = await Problem.findOne({ _id: probID });

    if (!prob) {
      console.log("Problem not found");
      return;
    }

    const [otherTimes, similarTaggedProblems] = await Promise.all([
      Submission.find({
        userID: { $ne: user.id },
        problemID: probID,
        status: "PASSED",
      }),
      Problem.find({ tags: { $in: prob.tags }, _id: { $ne: probID } }),
    ]);

    const timeArray = otherTimes.map((time) => time.output.runtime);
    const memoryArray = otherTimes.map((memory) => memory.output.memoryUsage);

    const processedData = {
      tags: prob.tags,
      similarTaggedProblems,

      recommendedSolvingTime: prob.recommendedTime,
      userSolvingTime: timer,

      allExecutionTime: timeArray,
      userExecutionTime: result.runtime,

      allMemory: memoryArray,
      userMemory: result.memoryUsage,

      difficulty: prob.difficulty,
    };

    console.log("PROCESSED DATA: ");
    console.log(processedData);
  } catch (error) {
    console.log(error);
  }
};

export default generateAssessment;
