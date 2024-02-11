import mongoose from 'mongoose';
const { Schema } = mongoose;

const tutorialSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  content: String,
  videoUrl: String,
  attachments: [String]
});

const problemSchema = new Schema({
  problemId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  difficulty: String
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  options: [String],
  correctOptionIndex: {
    type: Number,
    required: true
  }
});

const quizSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questions: [questionSchema]
});

const moduleSchema = new Schema({
  moduleName: {
    type: String,
    required: true
  },
  moduleDesc: String,
  prerequisites: [Schema.Types.ObjectId],
  tutorials: [tutorialSchema],
  problems: [problemSchema],
  quizzes: [quizSchema]
});

const learningPathSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  path: [moduleSchema]
});

const LearningPath = mongoose.model('LearningPath', learningPathSchema);
module.exports = LearningPath;
