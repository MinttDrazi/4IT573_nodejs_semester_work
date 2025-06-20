import GameStatus from "@/components/GameStatus";
import WishlistCard from "@/components/WishlistCard";
import PageLayout from "@/layouts/PageLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function GamePage() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<object>({});

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
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <GameStatus gameId={id} />
      <WishlistCard gameId={id} />
    </PageLayout>
  );
}

export default GamePage;
