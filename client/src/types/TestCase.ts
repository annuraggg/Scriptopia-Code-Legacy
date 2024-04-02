type Case = {
  name: string;
  difficulty: string;
  score: number;
  input: [string];
  output: string;
  isSample: boolean;
};

type Var = { name: string; type: string; value: string };

export type { Case, Var };
