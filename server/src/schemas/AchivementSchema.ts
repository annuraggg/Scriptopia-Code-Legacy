import mongoose from "mongoose";
const { Schema } = mongoose;

const achivementSchema = new Schema({
  badge: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  criteria: {
    type: [String],
    required: true,
  },
  reward: {
    type: String,
    required: true,
  },
});

const Achivement = mongoose.model("Achivement", achivementSchema);
module.exports = Achivement;
