import { ObjectId, Schema } from "mongoose";
import Problem from "./Problem";

interface OpenRange {
  start: Date;
  end: Date;
}

interface Candidate {
  name: string;
  email: string;
}

interface EditorOptions {
  autoComplete: boolean;
  runCode: boolean;
  syntaxHighlighting: boolean;
}

interface SecurityOptions {
  codePlayback: boolean;
  tabChangeDetection: boolean;
  gptDetection: boolean;
  copyPasteDetection: boolean;
  plagiarismDetection: boolean;
}

interface Feedback {
  email: string;
  phone: string;
}

interface Screening extends Document {
  _id: ObjectId;
  name: string;
  desc: string;
  instructions: string;
  languages: string[];
  duration: number;
  createdAt: Date;
  createdBy: ObjectId;
  openRange: OpenRange;
  questions: Problem[];
  candidates: Candidate[];
  takenBy: string[];
  editorOptions: EditorOptions;
  security: SecurityOptions;
  feedback: Feedback;
}

export default Screening;
