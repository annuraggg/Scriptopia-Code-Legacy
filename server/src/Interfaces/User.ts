import { Document, Types } from "mongoose";

interface AchievementReceivables {
  achievementId: Types.ObjectId;
  name: string;
  description?: string;
  receivedOn?: Date;
}

interface SolvedProblem {
  problemId: Types.ObjectId;
  title: string;
  score?: number;
  internalScore?: number;
}

interface LearningPathModule {
  moduleTitle: string;
  moduleDescription?: string;
  tutorials: string[];
  problems: {
    problemId: Types.ObjectId;
    title: string;
    solved: boolean;
    solvedOn?: Date;
    score?: number;
  }[];
  quizzes: Types.ObjectId[];
}

interface LoginHistory {
  date: Date;
  location?: string;
  device?: string;
  sessionID?: string;
  ip: string;
  valid: boolean;
  expires?: Date;
}

interface tfa {
  enabled: boolean;
  secret: string;
  createdAt: Date;
  recoveryCodes: [
    {
      code: Number;
      used: boolean;
    }
  ];
}

interface jobPreferences {
  location: [string];
  role: [string];
}

interface Score {
  submissionID: number;
  timerScore: number;
  testCaseScore: number;
}

interface User extends Document {
  firstName: string;
  lastName?: string;
  username: string;
  image: string;
  email: string;
  phone?: string;
  password?: string;
  accountType: string;
  tfa: tfa;
  googleId?: string;
  organization?: string;
  profilePicture?: string;
  bio?: string;
  enabledScreening: boolean;
  experience: number;
  jobPreferences: jobPreferences;
  achievements: AchievementReceivables[];
  solvedProblems: SolvedProblem[];
  userLevel?: number;
  internalLevel?: number;
  moderator: boolean;
  createdAt: Date;
  updatedAt: Date;
  score: Score[];
  learningPath: LearningPathModule[];
  tagsSolved: string[];
  loginHistory: LoginHistory[];
  emailVerified: boolean;
  phoneVerified: boolean;
  streak: string[];
}

export default User;
