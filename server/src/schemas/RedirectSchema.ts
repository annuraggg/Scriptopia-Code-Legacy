import mongoose from "mongoose";
const { Schema } = mongoose;

const redirectSchema = new Schema({
  from: {
    type: String,
    required: true,
    unique: true,
  },
  to: {
    type: String,
    required: true,
  },
});

const Redirect = mongoose.model("Redirect", redirectSchema);
export default Redirect;
