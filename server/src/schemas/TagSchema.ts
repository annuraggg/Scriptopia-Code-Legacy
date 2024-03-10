import mongoose from "mongoose";
const { Schema } = mongoose;

const tagSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
