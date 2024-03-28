import mongoose from "mongoose";
const { Schema } = mongoose;
import { generateUsername } from "unique-username-generator";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    default: generateUsername("-", 5),
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regular expression for basic email validation
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
  },
  accountType: {
    required: true,
    type: String,
  },
  googleId: {
    type: String,
    required: false,
  },
  organization: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  enabledScreening: {
    type: Boolean,
    default: false,
  },
  experience: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    required: false,
  },
  jobPreferences: {
    location: {
      type: [String],
      required: false,
    },
    role: {
      type: [String],
      required: false,
    },
  },
  tfa: {
    enabled: Boolean,
    secret: String,
    createdAt: Date,
    recoveryCodes: [
      {
        code: {
          type: Number,
          required: true,
        },
        used: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  achievements: [
    {
      achievementId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: String,
      receivedOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  solvedProblems: [
    {
      problemId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      solvedOn: Date,
      score: Number,
      internalScore: Number,
    },
  ],
  userLevel: Number,
  internalLevel: Number,
  moderator: Boolean,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  learningPath: [
    {
      moduleTitle: String,
      moduleDescription: String,
      tutorials: [String],
      problems: [
        {
          problemId: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          solved: Boolean,
          solvedOn: Date,
          score: Number,
        },
      ],
      quizzes: [Schema.Types.ObjectId],
    },
  ],
  tagsSolved: [String],
  loginHistory: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      location: String,
      device: String,
      sessionID: String,
      ip: String,
      valid: Boolean,
      expires: Date,
    },
  ],
  streak: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
