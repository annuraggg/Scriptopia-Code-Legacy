interface Reply {
  _id: string;
  userId: string;
  content: string;
  timestamp?: Date;
}

interface Message {
  _id: string;
  userId: string;
  content: string;
  timestamp?: Date;
  replies: Reply[];
}

interface Forum {
  postId: string;
  messages: Message[];
}

export default Forum;
