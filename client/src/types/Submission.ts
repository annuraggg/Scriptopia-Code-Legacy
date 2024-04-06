interface Submission extends Document {
  problemID: string;
  userID: string;
  code: string;
  language: string;
  status: string;
  output: Record<string, string>; // Assuming the output can be any object type
}

export default Submission;
