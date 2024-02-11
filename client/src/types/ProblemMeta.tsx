type Meta = {
  id: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  likes: number;
  dislikes: number;
  tags: string[];
  similarProblems: string[];
};

export default Meta;
