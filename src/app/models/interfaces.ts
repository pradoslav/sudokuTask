export type Difficulty = "easy" | "medium" | "hard" | "random";

export type Board = Array<Array<number>>;

export type BoardResponse = {
board: Board;
};

export type SolveResponse = {
  difficulty: Difficulty;
  solution: Board;
  status: "solved" | "unsolved";
  };

export type ValidateResponse = {
  status: "solved" | "unsolved";
};
