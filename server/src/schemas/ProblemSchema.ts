import mongoose from "mongoose";
const { Schema } = mongoose;

const problemSchema = new Schema({
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
  category: {
    type: String,
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
  starterVarArgs: {
    type: [],
    required: true,
  },
  testCases: [
    {
      input: {
        type: [String],
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
    },
  ],
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
