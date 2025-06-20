export type userGame = {
  id: number;
  userId: number;
  gameId: number;
  status: status;
};

export type userGameInput = {
  userId: number;
  gameId: number;
  status: status;
};

export type status =
  | "planned"
  | "playing"
  | "completed"
  | "on_hold"
  | "dropped";
