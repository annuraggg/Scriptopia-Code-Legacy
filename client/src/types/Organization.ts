import { Document, Schema, Types } from "mongoose";

interface Organization extends Document {
  name: string;
  description: string;
  website: string;
  screeners: Types.ObjectId[];
  ratings: Record<string, number>;
  admins: Types.ObjectId[];
  code: string;
  email: string;
  phone: string;
  requesters: Types.ObjectId[];
}

export default Organization;

