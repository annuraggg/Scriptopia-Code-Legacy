import { Document, Types } from "mongoose";

interface Question {
  question: string;
  options?: string[];
  correct_option_index: number;
}

interface Quiz extends Document {
  _id: Types.ObjectId;
  lang: string;
  questions: Question[];
}

export default Quiz;
