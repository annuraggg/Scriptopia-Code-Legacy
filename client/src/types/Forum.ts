import { Types } from "mongoose";

interface Reply {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  timestamp?: Date;
}

interface Message {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  timestamp?: Date;
  replies: Reply[];
}

interface Forum {
  postId: Types.ObjectId;
  messages: Message[];
}

export default Forum;
