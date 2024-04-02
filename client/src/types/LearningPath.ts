import { Document, Schema, Types } from 'mongoose';

interface Tutorial {
  title: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  attachments?: string[];
}

interface Problem {
  problemId: Types.ObjectId;
  title: string;
  description?: string;
  difficulty?: string;
}

interface Question {
  question: string;
  options?: string[];
  correctOptionIndex: number;
}

interface Quiz {
  quizId: Types.ObjectId;
  title: string;
  questions: Question[];
}

interface Module {
  moduleName: string;
  moduleDesc?: string;
  prerequisites?: Types.ObjectId[];
  tutorials?: Tutorial[];
  problems?: Problem[];
  quizzes?: Quiz[];
}

interface LearningPath {
  title: string;
  description?: string;
  path: Module[];
}

export default LearningPath;