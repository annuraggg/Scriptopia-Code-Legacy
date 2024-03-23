type Meta = {
  id: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  votes: number;
  tags: string[];
  author: string;
  authorid: number;
};

export default Meta;
