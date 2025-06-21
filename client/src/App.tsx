import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "./layouts/PageLayout";
import GameCard from "./components/GameCard";
import type { gameType } from "./types";
import H1Heading from "./components/typography/H1Heading";

function App() {
  const [games, setGames] = useState<gameType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/games")
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PageLayout>
      <H1Heading>All Games</H1Heading>
      <div className="grid grid-cols-6 gap-6">
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
    </PageLayout>
  );
}

export default App;
