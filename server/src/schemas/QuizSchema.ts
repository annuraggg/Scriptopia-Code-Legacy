import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correct_option_index: {
    type: Number,
    required: true,
  },
});

const quizSchema = new Schema({
  _id: Schema.Types.ObjectId,
  lang: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
