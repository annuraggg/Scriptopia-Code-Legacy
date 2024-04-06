import Problem from "@/schemas/ProblemSchema";
import Submission from "@/schemas/SubmissionSchema";
import User from "@/schemas/UserSchema";
import { spawn } from "child_process";

/*
    // Construct the dataframe
    const df = {
      userID: Object.keys(data),
      ...data,
    };

    const pythonProcess = spawn("python", [
      "src/ml/index.py",
      userID,
      JSON.stringify(df),
    ]);

    const onDataReceived = new Promise((resolve, reject) => {
      pythonProcess.stdout.on("data", async (data) => {
        const validJsonString = await data
          .toString()
          .replace(/True/g, "true")
          .replace(/False/g, "false")
          .replace(/'/g, '"');
        const result = JSON.parse(validJsonString);
        resolve(result);
      });
    });

    const result = await onDataReceived;
    return result;*/

const generateRecommendation = async (userID: string) => {
  try {
    const users = await User.find().select("_id");
    const problems = await Problem.find().select("_id");
    const submissions = await Submission.find().select(
      "problemID userID status"
    );

    const userIDs = users.map((user) => user._id.toString());
    const problemIDs = problems.map((problem) => problem._id.toString());

    const data: { [key: string]: number[] } = {
      // @ts-expect-error
      userID: userIDs,
    };

    // Initialize arrays for each problem with zeros
    problemIDs.forEach((problemID) => {
      data[problemID] = new Array(userIDs.length).fill(0);
    });

    // Iterate over submissions to populate the data
    submissions.forEach((submission) => {
      const { problemID, userID, status } = submission;
      const userIndex = userIDs.indexOf(userID.toString());
      const problemIndex = problemIDs.indexOf(problemID.toString());

      if (userIndex !== -1 && problemIndex !== -1 && status === "PASSED") {
        // @ts-expect-error
        data[problemID][userIndex] = 1;
      }
    });

    const df = {
      userID: Object.keys(data),
      ...data,
    };

    await fetch("http://localhost:5000/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        df,
      }),
    })
      .then(async (res) => {
        const resp = await res.json();
        return resp;
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error: any) {
    return { error: error.message };
  }
};

export default generateRecommendation;
