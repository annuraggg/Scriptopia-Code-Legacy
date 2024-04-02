import Problem from "@/schemas/ProblemSchema";
import Submission from "@/schemas/SubmissionSchema";
import User from "@/schemas/UserSchema";
import { spawn } from "child_process";
import { ObjectId } from "mongoose";

const generateRecommendation = async (userID: string) => {
  try {
    const uid = await User.find().select("_id");
    const problems = await Problem.find().select("_id");
    const submissions = await Submission.find().select(
      "problemID userID status"
    );

    const uidArr = uid.map((id) => id._id.toString());
    const probArr = problems.map((id) => id._id.toString());

    /* return in format:
        userID: ["Ammar", "Anurag", "Abdul", "Shravan", "Shreyash"],
    twoSum: [1, 1, 1, 1, 1],
    longestSubstring: [1, 0, 0, 0, 1],
    keyboardRow: [1, 0, 1, 1, 0],
    longestPalidromic: [1, 1, 1, 1, 0],
    */

    const data: { [key: string]: number[] } = {};
    const consideredProblems: string[] = [];

    const df = {
      userID: Object.keys(data),
      ...data,
    };

    console.log("userArr Length: ", uidArr.length);

    console.log(df);

    return;

    const pythonProcess = spawn("python", [
      "src/ml/index.py",
      userID,
      JSON.stringify(df),
    ]);

    pythonProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    pythonProcess.on("exit", (code) => {
      console.log(`Python script exited with code ${code}`);
    });
  } catch (error: any) {
    console.error(error?.message);
  }
};

export default generateRecommendation;

/*    const uid = await User.find().select("_id");
    const ids: string[] = [];
    uid.map((id) => {
      ids.push(id._id.toString());
    });

    const problems = await Problem.find().select("_id");
    const pid: string[] = [];
    problems.map((id) => {
      pid.push(id._id.toString());
    });

    const submissions = await Submission.find().select(
      "problemID userID status"
    );

    const data: { [key: string]: number[] } = {};
    const problemsConsidered: { [key: string]: string[] } = {};

    submissions.map((sub) => {
      if (ids.includes(sub.userID.toString())) {
        if (!problemsConsidered[sub.userID.toString()]) {
          problemsConsidered[sub.userID.toString()] = [];
        }
        if (
          !problemsConsidered[sub.userID.toString()].includes(
            sub.problemID.toString()
          )
        ) {
          problemsConsidered[sub.userID.toString()].push(
            sub.problemID.toString()
          );
          if (data[sub.userID.toString()]) {
            data[sub.userID.toString()].push(sub.status === "PASSED" ? 1 : 0);
          } else {
            data[sub.userID.toString()] = [sub.status === "PASSED" ? 1 : 0];
          }
        }
      }
    });

    const df = {
      userID: Object.keys(data),
      ...data,
    };

    console.log(df);*/

/*
  const userID = "Anurag";

  const df = {
    userID: ["Ammar", "Anurag", "Abdul", "Shravan", "Shreyash"],
    twoSum: [1, 1, 1, 1, 1],
    longestSubstring: [1, 0, 0, 0, 1],
    keyboardRow: [1, 0, 1, 1, 0],
    longestPalidromic: [1, 1, 1, 1, 0],
  };
*/
