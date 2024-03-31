import { Document, Schema, Types } from "mongoose";

interface TestCase {
  name: string;
  difficulty: string;
  score: number;
  input: any;
  output: any;
  isSample: boolean;
}

interface Problem extends Document {
  _id: Types.ObjectId;
  title: string;
  description: Record<string, any>; // Assuming the description can be any object type
  author: string;
  difficulty: string;
  languageSupport: string[];
  recommendedTime: number;
  tags?: string[];
  votes: number;
  starterFunction: string;
  functionReturn: string;
  starterVarArgs: any[]; // Adjust this type according to the actual data type expected
  testCases: TestCase[];
  isPrivate?: boolean;
  lastUpdated: Date;
  chatId?: Types.ObjectId | null;
  __v: number;
}

export default Problem;
