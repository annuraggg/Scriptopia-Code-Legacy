import mongoose, { Schema, Types } from "mongoose";

const screeningSubmissionSchema = new Schema({
  screeningId: {
    type: Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  submission: {
    type: [
      {
        problemId: Types.ObjectId,
        score: Number,
        submission: {
          type: {
            code: {
              type: String,
              required: true,
            },
            lang: {
              type: String,
              required: true,
            },
            probID: {
              type: Types.ObjectId,
              required: true,
            },
            totalTime: {
              type: Number,
              required: true,
            },
            paste: {
              type: Number,
              required: true,
            },
            tabChange: {
              type: Number,
              required: true,
            },
            runs: {
              type: Number,
              required: true,
            },
            output: {
              type: [Schema.Types.Mixed], // Allow any type
              required: true,
            },
            consoleOP: {
              type: [String],
              required: true,
            },
            error: {
              type: String,
              required: false,
            },
          },
          required: true,
        },

        result: {
          type: {
            timeStamp: {
              type: Number,
              required: true,
            },
            status: {
              type: Number,
              required: true,
            },
            output: {
              type: [Schema.Types.Mixed], // Allow any type
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
            failedCase: {
              type: {
                id: Types.ObjectId,
                input: [String],
                output: String,
              },
              required: false,
            },
          },
          required: true,
        },
      },
    ],
    required: true,
  },

  sessionUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  timeTaken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ScreeningSubmission = mongoose.model(
  "ScreeningSubmission",
  screeningSubmissionSchema
);
export default ScreeningSubmission;
