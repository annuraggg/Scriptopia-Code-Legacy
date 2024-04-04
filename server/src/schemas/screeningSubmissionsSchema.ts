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
    type: Object,
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
