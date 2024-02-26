import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    default: Math.random().toString(36).substring(7),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regular expression for basic email validation
    match: /^\S+@\S+\.\S+$/,
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
      title: {
        type: String,
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
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
