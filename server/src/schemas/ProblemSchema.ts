import mongoose from "mongoose";
const { Schema } = mongoose;

export const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Object,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  languageSupport: {
    type: [String],
    required: true,
  },
  recommendedTime: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  tags: [String],
  votes: {
    type: Number,
    default: 0,
  },
  starterFunction: {
    type: String,
    required: true,
  },
  functionReturn: {
    type: String,
    required: true,
  },
  starterVarArgs: {
    type: [],
    required: true,
  },
  testCases: [
    {
      name: {
        type: String,
        required: true,
      },
      difficulty: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      input: {
        type: Schema.Types.Mixed,
        required: true,
      },
      output: {
        type: Schema.Types.Mixed,
        required: true,
      },
      isSample: {
        type: Boolean,
        required: true,
      },
    },
  ],
  isPrivate: {
    type: Boolean,
    default: false,
  },
  allowInterview: {
    type: Boolean,
    default: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  chatId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
