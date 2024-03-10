import { Document, Schema, Types } from 'mongoose';

interface Submission extends Document {
  problemID: Types.ObjectId;
  userID: Types.ObjectId;
  code: string;
  language: string;
  status: string;
  output: Record<string, any>; // Assuming the output can be any object type
}

export default Submission;
