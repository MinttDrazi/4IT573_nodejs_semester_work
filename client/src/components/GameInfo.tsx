import type { gameType } from "@/types";
import H1Heading from "./typography/H1Heading";

function GameInfo({ game }: { game: gameType }) {
  return (
    <div className="w-full bg-gray-300 rounded-xl p-10 flex">
      <div className="w-1/4">
        {" "}
        <img src={game.image} className="rounded-md" />
      </div>

      <div className="p-6">
        <H1Heading>{game.title}</H1Heading>
        <p>{game.description}</p>
      </div>
    </div>
  );
}

export default GameInfo;
