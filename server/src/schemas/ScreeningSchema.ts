import mongoose, { Schema, Types } from "mongoose";
import { problemSchema as Problem } from "./ProblemSchema.js";

const screeningSchema = new Schema({
  name: String,
  desc: String,
  instructions: String,
  duration: Number,
  languages: [String],
  createdAt: Date,
  createdBy: String,
  openRange: {
    start: Date,
    end: Date,
  },
  questions: [Problem],
  qualifyingScore: Number,
  candidates: [
    {
      name: String,
      email: String,
    },
  ],
  takenBy: [String],
  editorOptions: {
    autoComplete: Boolean,
    runCode: Boolean,
    syntaxHighlighting: Boolean,
  },
  security: {
    codePlayback: Boolean,
    tabChangeDetection: Boolean,
    gptDetection: Boolean,
    copyPasteDetection: Boolean,
    plagiarismDetection: Boolean,
  },
  feedback: {
    email: String,
    phone: String,
  },
});

const Screening = mongoose.model("Screening", screeningSchema);
export default Screening;
