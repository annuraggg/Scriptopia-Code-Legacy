import { Delta } from "quill/core";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface TestCase {
  name: string;
  difficulty: string;
  score: number;
  input: string | number | boolean | string[] | number[] | boolean[];
  output: string | number | boolean | string[] | number[] | boolean[];
  isSample: boolean;
}

interface Problem {
  _id: string;
  title: string;
  description: Delta; // Assuming the description can be any object type
  author: string;
  difficulty: string;
  languageSupport: string[];
  recommendedTime: number;
  tags: string[];
  votes: number;
  starterFunction: string;
  functionReturn: string;
  starterVarArgs: any[]; // Adjust this type according to the actual data type expected
  testCases: TestCase[];
  isPrivate: boolean;
  lastUpdated: Date;
  chatId?: string;
}

export default Problem;
