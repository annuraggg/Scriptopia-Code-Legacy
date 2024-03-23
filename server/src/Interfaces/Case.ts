interface Case {
  _id: string;
  name: string;
  difficulty: string;
  score: number;
  input: string[];
  output: string;
  isSample: boolean;
};

export default Case;
