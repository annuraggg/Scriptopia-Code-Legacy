interface Question {
  question: string;
  options?: string[];
  correct_option_index: number;
}

interface Quiz extends Document {
  _id:  string;
  lang: string;
  questions: Question[];
}

export default Quiz;
