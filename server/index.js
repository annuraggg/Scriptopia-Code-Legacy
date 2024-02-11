// imports for server
import app from "./config/init.js";

// imports for APIS
import runJS from "./languageTemplates/js.js";
import auth from "./api/auth/main.js";

app.use("/auth", auth);

app.post("/", async (req, res) => {
  const language = "js";
  const input = "a\\nb";
  const code = "function sum(a, b) { return a + b }";

  fetch("https://excompiler.onrender.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ language, input, code: runJS(code, input) }),
  }).then(async (res) => await res.json().then(console.log));
});

app.post("/get", async (req, res) => {
  const desc = {
    time: 1707201004233,
    blocks: [
      {
        id: "i0kv45N4Cx",
        type: "header",
        data: {
          text: "Maximum Length of a Concatenated String with Unique Characters",
          level: 1,
        },
      },
      {
        id: "TpTpi6qDBl",
        type: "paragraph",
        data: {
          text: "You are given an array of strings arr. A string s is formed by the concatenation of a subsequence of arr that has unique characters.",
        },
      },
      {
        id: "VjX96MZySF",
        type: "paragraph",
        data: { text: "Return the maximum possible length of s." },
      },
      {
        id: "DwcCIHwzgm",
        type: "paragraph",
        data: {
          text: "A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.",
        },
      },
      { id: "NGdzjUQE34", type: "paragraph", data: { text: "Example 1:" } },
      {
        id: "yGSIyx9y4L",
        type: "code",
        data: {
          code: 'Input: arr = ["un","iq","ue"]\nOutput: 4\nExplanation: All the valid concatenations are:\n- ""\n- "un"\n- "iq"\n- "ue"\n- "uniq" ("un" + "iq")\n- "ique" ("iq" + "ue")\nMaximum length is 4.\n',
        },
      },
      { id: "LWLEnQtshQ", type: "paragraph", data: { text: "Example 2:" } },
      {
        id: "efgNYMjrE8",
        type: "code",
        data: {
          code: 'Input: arr = ["cha","r","act","ers"]\nOutput: 6\nExplanation: Possible longest valid concatenations are "chaers" ("cha" + "ers") and "acters" ("act" + "ers").\n',
        },
      },
      { id: "e-4iQJPwel", type: "paragraph", data: { text: "Example 3:" } },
      {
        id: "6g3COqn1sG",
        type: "code",
        data: {
          code: 'Input: arr = ["abcdefghijklmnopqrstuvwxyz"]\nOutput: 26\nExplanation: The only string in arr has all 26 characters.\n',
        },
      },
      { id: "LVjOQeQS-1", type: "paragraph", data: { text: "Constraints:" } },
      {
        id: "ZmhMGnFhsr",
        type: "list",
        data: {
          style: "unordered",
          items: [
            "1 <= arr.length <= 16",
            "1 <= arr[i].length <= 26",
            "arr[i] contains only lowercase English letters.",
          ],
        },
      },
    ],
    version: "2.29.0",
  };

  const meta = {
    id: 1,
    title: "Maximum Length of a Concatenated String with Unique Characters",
    difficulty: "medium",
    likes: 56,
    dislikes: 69,
    tags: ["JavaScript", "Functions", "Operators"],
  };

  //addition of two numbers test cases
  const cases = [
    {
      input: "1\n2",
      output: "3",
    },
    {
      input: "2\n3",
      output: "5",
    },
    {
      input: "3\n4",
      output: "7",
    },
  ];

  const code = `function sum(a, b) {
  }`;

  res.json({ desc, meta, cases, code });
});

app.listen(3000);
