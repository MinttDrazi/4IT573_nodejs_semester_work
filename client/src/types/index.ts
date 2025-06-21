export type gameType = {
  id: number;
  description: string;
  title: string;
  image: string;
  status?: status;
};

export type libraryType = {
  id: number;
  userId: number;
  gameId: number;
  status: status;
};

export type wishlistType = {
  id: number;
  userId: number;
  gameId: number;
};

type status = "planned" | "playing" | "completed" | "on_hold" | "dropped";
