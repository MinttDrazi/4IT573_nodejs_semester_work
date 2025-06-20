import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "./layouts/PageLayout";
import GameCard from "./components/GameCard";

function App() {
  // 1) Stav pro přijatá data
  const [games, setGames] = useState<
    { id: string; title: string; description: string; image: string }[]
  >([]);

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
      <h1 className="text-6xl font-bold mb-4">All Games</h1>
      <div className="grid grid-cols-6 gap-6">
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
    </PageLayout>
  );
}

export default App;
