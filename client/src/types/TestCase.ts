type Case = {
  name: string;
  difficulty: string;
  score: number;
  input: string | number | boolean | string[] | number[] | boolean[];
  output: string | number | boolean | string[] | number[] | boolean[];
  isSample: boolean;
};

type Var = { name: string; type: string; value: string };

export type { Case, Var };
