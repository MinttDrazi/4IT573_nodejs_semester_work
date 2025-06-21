import GameInfo from "@/components/GameInfo";
import GameStatus from "@/components/GameStatus";
import WishlistCard from "@/components/WishlistCard";
import PageLayout from "@/layouts/PageLayout";
import type { gameType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function GamePage() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<gameType>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/games/${id}`)
      .then((res) => {
        setGame(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, setGame]);

  return (
    <PageLayout>
      {game && <GameInfo game={game} />}
      <div className="w-full flex space-x-8 mt-6">
        <GameStatus gameId={id} />
        <WishlistCard gameId={id} />
      </div>
    </PageLayout>
  );
}

export default GamePage;
