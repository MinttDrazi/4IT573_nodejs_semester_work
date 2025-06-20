import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "./layouts/PageLayout";

function App() {
  // 1) Stav pro přijatá data
  const [games, setGames] = useState<object[]>([]);

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
          <div className="p-3 bg-blue-200 rounded-xl space-y-2" key={game.id}>
            <img src={game.image} className="rounded-md" />
            <h4 className="text-xl font-semibold">{game.title}</h4>
            <p>{game.description}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export default App;
