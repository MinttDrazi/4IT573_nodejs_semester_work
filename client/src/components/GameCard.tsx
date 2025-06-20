import { NavLink } from "react-router";

interface GameCardProps {
  game: { id: string; title: string; description: string; image: string };
}

function GameCard({ game }: GameCardProps) {
  return (
    <div className="p-4 bg-blue-200 rounded-xl" key={game.id}>
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
