import mongoose, { Schema } from "mongoose";
import { problemSchema as Problem } from "./ProblemSchema";

const screeningSchema = new Schema({
  name: String,
  desc: String,
  instructions: String,
  duration: Number,
  openRange: {
    start: Date,
    end: Date,
  },
  questions: [Problem],
  candidates: [
    {
      name: String,
      email: String,
    },
  ],
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
