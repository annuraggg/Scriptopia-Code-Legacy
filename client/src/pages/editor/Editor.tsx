import Split from "react-split";
import { Navbar } from "@/components/ui/navbar";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";
import Descriptor from "./Descriptor";
import { useEffect, useState } from "react";
import { Delta } from "quill/core";
import Meta from "@/types/ProblemMeta";
import { Case } from "@/types/TestCase";

/*
const statementSample = {
  ops: [
    { insert: "You are given an array of strings " },
    {
      attributes: {
        color: "rgba(239, 241, 246, 0.75)",
        background: "rgba(255, 255, 255, 0.07)",
        code: true,
      },
      insert: "arr",
    },
    { insert: ". A string " },
    {
      attributes: {
        color: "rgba(239, 241, 246, 0.75)",
        background: "rgba(255, 255, 255, 0.07)",
        code: true,
      },
      insert: "s",
    },
    { insert: " is formed by the " },
    { attributes: { bold: true }, insert: "concatenation" },
    { insert: " of a " },
    { attributes: { bold: true }, insert: "subsequence" },
    { insert: " of " },
    {
      attributes: {
        color: "rgba(239, 241, 246, 0.75)",
        background: "rgba(255, 255, 255, 0.07)",
        code: true,
      },
      insert: "arr",
    },
    { insert: " that has " },
    { attributes: { bold: true }, insert: "unique characters" },
    { insert: ".\nReturn " },
    { attributes: { italic: true }, insert: "the " },
    { attributes: { italic: true, bold: true }, insert: "maximum" },
    { attributes: { italic: true }, insert: " possible length" },
    { insert: " of " },
    {
      attributes: {
        color: "rgba(239, 241, 246, 0.75)",
        background: "rgba(255, 255, 255, 0.07)",
        code: true,
      },
      insert: "s",
    },
    { insert: ".\nA " },
    { attributes: { bold: true }, insert: "subsequence" },
    {
      insert:
        " is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.\n \n",
    },
    { attributes: { bold: true }, insert: "Example 1:" },
    { insert: '\nInput: arr = ["un","iq","ue"]' },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: "Output: 4" },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: "Explanation: All the valid concatenations are:" },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: '- ""' },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: '- "un"' },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: '- "iq"' },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: '- "ue"' },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: '- "uniq" ("un" + "iq")' },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: '- "ique" ("iq" + "ue")' },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: "Maximum length is 4." },
    { attributes: { "code-block": true }, insert: "\n" },
    { attributes: { bold: true }, insert: "Example 2:" },
    { insert: '\nInput: arr = ["cha","r","act","ers"]' },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: "Output: 6" },
    { attributes: { "code-block": true }, insert: "\n" },
    {
      insert:
        'Explanation: Possible longest valid concatenations are "chaers" ("cha" + "ers") and "acters" ("act" + "ers").',
    },
    { attributes: { "code-block": true }, insert: "\n" },
    { attributes: { bold: true }, insert: "Example 3:" },
    { insert: '\nInput: arr = ["abcdefghijklmnopqrstuvwxyz"]' },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: "Output: 26" },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: "Explanation: The only string in arr has all 26 characters." },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: " \n" },
    { attributes: { bold: true }, insert: "Constraints:" },
    { insert: "\n" },
    {
      attributes: {
        color: "rgba(239, 241, 246, 0.75)",
        background: "rgba(255, 255, 255, 0.07)",
        code: true,
      },
      insert: "1 <= arr.length <= 16",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    {
      attributes: {
        color: "rgba(239, 241, 246, 0.75)",
        background: "rgba(255, 255, 255, 0.07)",
        code: true,
      },
      insert: "1 <= arr[i].length <= 26",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    {
      attributes: {
        color: "rgba(239, 241, 246, 0.75)",
        background: "rgba(255, 255, 255, 0.07)",
        code: true,
      },
      insert: "arr[i]",
    },
    { insert: " contains only lowercase English letters." },
    { attributes: { list: "bullet" }, insert: "\n" },
    { insert: "\n" },
  ],
};*/

const metaSample: Meta = {
  id: 1239,
  title: "Maximum Length of a Concatenated String with Unique Characters",
  difficulty: "medium",
  likes: 123,
  dislikes: 12,
  tags: ["string", "backtracking"],
  similarProblems: [
    "Maximum Length of a Concatenated String with Unique Characters II",
  ],
};

const codeSample = `/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function(arr) {
  return 0;
};`;

const casesSample: Case[] = [
  {
    // @ts-ignore
    // ! SOLVE ERROR OF TYPE MISMATCH
    var: [
      {
        name: "arr",
        type: "string[]",
        value: '["un", "iq", "ue"]',
      },
    ],
    output: "2",
    expected: 4,
  },
  {
    // @ts-ignore
    // ! SOLVE ERROR OF TYPE MISMATCH
    var: [
      {
        name: "arr",
        type: "string[]",
        value: '["a", "b", "c"]',
      },
    ],
    output: "3",
    expected: 3,
  },
  {
    // @ts-ignore
    // ! SOLVE ERROR OF TYPE MISMATCH
    var: [
      {
        name: "arr",
        type: "string[]",
        value: '["a", "a", "a"]',
      },
    ],
    output: "1",
    expected: 1,
  },
  {
    // @ts-ignore
    // ! SOLVE ERROR OF TYPE MISMATCH
    var: [
      {
        name: "arr",
        type: "string[]",
        value: '["a", "b", "c", "d", "a", "b", "c", "d"]',
      },
    ],
    output: "8",
    expected: 8,
  },
  {
    // @ts-ignore
    // ! SOLVE ERROR OF TYPE MISMATCH
    var: [
      {
        name: "arr",
        type: "string[]",
        value: '["a", "b", "c", "d", "a", "b", "c", "d", "e"]',
      },
    ],
    output: "8",
    expected: 8,
  },
  {
    // @ts-ignore
    // ! SOLVE ERROR OF TYPE MISMATCH
    var: [
      {
        name: "arr",
        type: "string[]",
        value: '["a", "b", "c", "d", "a", "b", "c", "d", "e", "f"]',
      },
    ],
    output: "10",
    expected: 10,
  },
  {
    // @ts-ignore
    // ! SOLVE ERROR OF TYPE MISMATCH
    var: [
      {
        name: "arr",
        type: "string[]",
        value: '["a", "b", "c", "d", "a", "b", "c", "d", "e", "f", "g"]',
      },
    ],
    output: "10",
    expected: 10,
  },
  {
    // @ts-ignore
    // ! SOLVE ERROR OF TYPE MISMATCH
    var: [
      {
        name: "arr",
        type: "string[]",
        value: '["a", "b", "c", "d", "a", "b", "c", "d", "e", "f", "g", "h"]',
      },
    ],
    output: "10",
    expected: 10,
  },
];

const consoleOutputSample: string = "12\n24\n32\n64";

function App() {
  const [statement, setStatement] = useState<Delta>({} as Delta);
  const [meta, setMeta] = useState<Meta>({} as Meta);
  const [code, setCode] = useState<string>("");
  const [cases, setCases] = useState<Case[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string>("");

  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:3000/get", {
      method: "POST",
    })
      .then(async (res) => {
        const response = await res.json();
        setStatement(response.desc);
        setMeta(response.meta);
        setCases(response.cases);
        setCode(response.code);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch data
    // @ts-ignore
    setMeta(metaSample);
    setCode(codeSample);
    setCases(casesSample);
    setConsoleOutput(consoleOutputSample);
  }, []);

  // @ts-ignore
  const runCode = (code: string) => {
    setRunning(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setRunning(false);
        setRuns(runs + 1);
        resolve("Hello World");
      }, 1000);
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex gap-5 px-5 h-[90vh] overflow-y-auto flex-col md:flex-row">
        <ProblemStatement statement={statement} meta={meta} />
        <Split className="md:w-[50%] w-[100%] h-[90vh]" direction="vertical">
          <CodeEditor runCode={runCode} code={code} />
          <Descriptor
            cases={cases}
            consoleOutput={consoleOutput}
            running={running}
            runs={runs}
          />
        </Split>
      </div>
    </>
  );
}
export default App;
