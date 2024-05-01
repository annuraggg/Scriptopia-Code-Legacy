import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import ReactCodeMirror, { oneDark } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";

interface Data {
  candidateName: string;
  candidateEmail: string;
  codeLanguage: string;
  question: {
    id: number;
    name: string;
    cases: {
      input: string;
      output: string;
      expected: string;
      score: number;
    }[];
    complexity: string;
    code: string;
  };
}

const Submission = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [complexityClass, setComplexityClass] = useState("");

  useEffect(() => {
    const sampledata = {
      candidateName: "Anurag Sawant",
      candidateEmail: "anuragsawant@duck.com",
      codeLanguage: "javascript",
      question: {
        id: 1,
        name: "Two Sums",
        cases: [
          {
            input: "[2, 7, 11, 15]",
            output: "[0, 1]",
            expected: "[0, 1]",
            score: 5,
          },
          {
            input: "[3, 2, 4]",
            output: "6",
            expected: "6",
            score: 1,
          },
          {
            input: "[3, 3]",
            output: "6",
            expected: "8",
            score: 0,
          },
        ],
        complexity: "O(n)",
        code: `function twoSum(nums, target) {
                const map = new Map();
                for (let i = 0; i < nums.length; i++) {
                    const complement = target - nums[i];
                    if (map.has(complement)) {
                        return [map.get(complement), i];
                    }
                    map.set(nums[i], i);
                }
            }`,
      },
    };

    setData(sampledata);
    setComplexityClass(genComplexityClass(sampledata.question.complexity));
  }, []);

  const genComplexityClass = (complexity: string) => {
    switch (complexity) {
      case "O(log n)":
        return "excellent";
      case "O(1)":
        return "good";
      case "O(n)":
        return "fair";
      case "O(n log n)":
        return "bad";
      case "O(n^2)":
        return "horrible";
      case "O(2^n)":
        return "horrible";
      case "O(n!)":
        return "horrible";
      default:
        return "horrible";
    }
  };

  const extension = (lang: string) => {
    switch (lang) {
      case "javascript":
        return javascript({ jsx: true });
      case "python":
        return python();
      case "java":
        return java();
      default:
        return javascript({ jsx: true });
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-10 py-5">
        <h2>Results</h2>
        <p>For the user anuragsawant@duck.com</p>

        <div className="flex border p-3 mt-5 items-center justify-between rounded-lg">
          {data?.question?.name}
          <Button variant="link">View Question</Button>
        </div>

        <Accordion type="single" collapsible className="mt-5">
          <AccordionItem value="item-1">
            <AccordionTrigger className=" bg-yellow-500 bg-opacity-40 rounded-lg px-3">
              Test Cases
            </AccordionTrigger>
            <AccordionContent className="p-5 px-32">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Input</TableHead>
                    <TableHead>Output</TableHead>
                    <TableHead>Expected</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.question?.cases?.map((testCase, index) => (
                    <TableRow key={index}>
                      <TableCell className="py-3">{testCase.input}</TableCell>
                      <TableCell>{testCase.output}</TableCell>
                      <TableCell>{testCase.expected}</TableCell>
                      <TableCell>{testCase.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex gap-5">
          <div className=" flex p-5 bg-opacity-80 mt-5 rounded-lg text-center border">
            <div className="flex flex-col items-center justify-center gap-5 p-5">
              <h5>Complexity</h5>
              <div
                className={`
            ${
              complexityClass === "excellent"
                ? "bg-green-500"
                : complexityClass === "good"
                ? "bg-green-500"
                : complexityClass === "fair"
                ? "bg-yellow-500"
                : complexityClass === "bad"
                ? "bg-yellow-500"
                : complexityClass === "horrible"
                ? "bg-red-500"
                : "bg-red-500"
            } h-2 w-2 rounded-full`}
              ></div>
              <p className="text-3xl">{data?.question?.complexity}</p>
            </div>

            <Separator orientation="vertical" className="h-30 mx-5" />

            <div className="px-10">
              <p>{complexityClass.toUpperCase()} Complexity</p>
              <p className="mt-5">
                This is the running time of your algorithm expressed in Big-O
                notation. Big-O notation is used to classify algorithms
                according to how their run time grows as the input size grows.
              </p>
            </div>
          </div>

          <ReactCodeMirror
            value={data?.question?.code}
            extensions={[extension(data?.codeLanguage || "javascript")]}
            theme={oneDark}
            readOnly={true}
            className="w-full h-1/2 mt-5 ml-5 p-5 bg-[#282C34]"
          />
        </div>
      </div>
    </>
  );
};

export default Submission;
