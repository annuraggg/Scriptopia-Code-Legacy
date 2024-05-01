import Problem from "@/schemas/ProblemSchema.js";
import Submission from "@/schemas/SubmissionSchema.js";
import User from "@/schemas/UserSchema.js";
import ProblemType from "@/Interfaces/Problem.js";

const generateRecommendation = async (selectedUserID: string) => {
  try {
    const users = await User.find().select("_id");

    const problemsAll = await Problem.find().select("_id");
    const userProfile = await User.findOne({ _id: selectedUserID });

    const problems: ProblemType[] = [];

    if (!userProfile) throw new Error("User not found");
    if (!problemsAll) throw new Error("Problems not found");

    problemsAll.forEach((problem) => {
      // @ts-expect-error - userProfile.solvedProblems is an array of strings
      if (!userProfile.solvedProblems.includes(problem._id)) {
        problems.push(problem);
      }
    });

    const submissions = await Submission.find().select(
      "problemID userID status"
    );

    const userIDs = users.map((user) => user._id.toString());
    const problemIDs = problems.map((problem) => problem._id.toString());

    const data: { [key: string]: string[] } = {
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

    let df = {
      ...data,
    };

    const newUIDs: string[] = [];
    df.userID.forEach((uid) => {
      newUIDs.push("a" + uid);
    });

    Object.keys(df).forEach((key) => {
      if (key !== "userID") {
        const newKey = "p" + key;
        df[newKey] = df[key];
        delete df[key];
      }
    });

    df.userID = newUIDs;
    let response: unknown = null;

    await fetch("http://localhost:5000/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: "a" + selectedUserID,
        df: JSON.stringify(df),
      }),
    })
      .then(async (res) => {
        const resp: unknown = await res.json();
        response = { error: false, response: resp };
      })
      .catch((err) => {
        response = { error: true, response: err };
      });

    return response;
  } catch (error: any) {
    return { error: error.message };
  }
};

export default generateRecommendation;
