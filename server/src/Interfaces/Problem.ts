import { Document, Schema, Types } from "mongoose";

interface TestCase {
  input: string[];
  output: string;
}

interface Problem extends Document {
  title: string;
  description: Record<string, any>; // Assuming the description can be any object type
  author: string;
  category: string;
  difficulty: string;
  tags?: string[];
  votes: number;
  starterFunction: string;
  starterVarArgs: any[]; // Adjust this type according to the actual data type expected
  testCases: TestCase[];
  chatId?: Types.ObjectId;
}

export default Problem;
