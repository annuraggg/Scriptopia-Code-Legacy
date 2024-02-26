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
    type: Object,
    required: true,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;