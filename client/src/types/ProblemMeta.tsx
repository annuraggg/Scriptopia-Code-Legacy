type Meta = {
  id: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  votes: number;
  tags: string[];
};

export default Meta;
