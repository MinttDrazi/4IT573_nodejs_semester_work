import type { gameType } from "@/types";
import { NavLink } from "react-router";

interface GameCardProps {
  game: gameType;
}

function GameCard({ game }: GameCardProps) {
  return (
    <div className="p-4 bg-gray-200 rounded-xl" key={game.id}>
      {game.status && (
        <div className="bg-gray-500 text-white mb-2 p-1 uppercase rounded-sm">
          {game.status}
        </div>
      )}
      <NavLink to={`/game/${game.id}`}>
        <img src={game.image} className="rounded-md" />
      </NavLink>
      <NavLink to={`/game/${game.id}`}>
        <h4 className="text-xl font-semibold my-2">{game.title}</h4>
      </NavLink>
      <p>{game.description}</p>
    </div>
  );
}

export default GameCard;
