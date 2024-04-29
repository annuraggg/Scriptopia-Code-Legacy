interface AchievementReceivables {
  achievementId: string;
  name: string;
  description?: string;
  receivedOn?: Date;
}

interface SolvedProblem {
  problemId: string;
  title: string;
  score?: number;
  internalScore?: number;
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
      code: number;
      used: boolean;
    }
  ];
}

interface jobPreferences {
  location: [string];
  role: [string];
}

interface score {
  submissionID: string;
  timerScore: number;
  testCaseScore: number;
  date: Date;
}

interface User {
  firstName: string;
  lastName?: string;
  image?: string;
  username: string;
  links: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  email: string;
  phone?: string;
  password?: string;
  accountType: string;
  googleId?: string;
  organization?: string;
  profilePicture?: string;
  enabledScreening: boolean;
  experience: number;
  bio?: string;
  jobPreferences: jobPreferences;
  tfa: tfa;
  achievements: AchievementReceivables[];
  solvedProblems: SolvedProblem[];
  userLevel?: number;
  internalLevel?: number;
  moderator: boolean;
  createdAt: Date;
  updatedAt: Date;
  loginHistory: LoginHistory[];
  score: score[];
  emailVerified: boolean;
  phoneVerified: boolean;
  streak: string[];
}

export default User;
