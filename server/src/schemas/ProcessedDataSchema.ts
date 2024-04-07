import mongoose from "mongoose";
const { Schema } = mongoose;

const processeddata = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  probID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  tags: [String],
  difficulty: {
    type: String,
    required: true,
  },
});

const processedData = mongoose.model("processedData", processeddata);
export default processedData;