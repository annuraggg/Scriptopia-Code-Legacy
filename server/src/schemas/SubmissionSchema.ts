import { error } from "console";
import mongoose from "mongoose";
const { Schema } = mongoose;

const submissionSchema = new Schema({
  problemID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  output: {
    type: {
      timeStamp: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      internalStatus: {
        type: String,
        required: true,
      },
      failedCaseNumber: {
        type: Number,
        required: true,
      },
      failedCase: {
        type: {
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
            type: String,
            required: true,
          },
          output: {
            type: String,
            required: true,
          },
          isSample: {
            type: Boolean,
            required: true,
          },
        },
        required: true,
      },
      error: {
        type: String,
        required: false,
      },
      language: {
        type: String,
        required: true,
      },
      info: {
        type: String,
        required: true,
      },
      consoleOP: {
        type: [String],
        required: true,
      },
      runtime: {
        type: Number,
        required: true,
      },
      memoryUsage: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
