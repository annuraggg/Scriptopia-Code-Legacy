import mongoose from 'mongoose';
const { Schema } = mongoose;

const problemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  tags: [String],
  votes: {
    type: Number,
    default: 0
  },
  testCases: [{
    input: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    }
  }],
  chatId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
