import mongoose from 'mongoose';
const { Schema } = mongoose;

const replySchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const messageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  replies: [replySchema]
});

const forumSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  messages: [messageSchema]
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;
