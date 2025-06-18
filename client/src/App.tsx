import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // 1) Stav pro přijatá data
  const [games, setGames] = useState<object[]>([]);

  // 2) Funkce pro volání API a uložení dat do stavu
  const apiCall = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/games");
      // pokud server vrací pole přímo, použij response.data
      setGames(response.data);
      // pokud to vrací objekt jako { games: […] }, pak:
      // setGames(response.data.games);
    } catch (err) {
      console.error("Chyba při načítání her:", err);
    }
  };

  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={apiCall}>Načíst hry</button>

      {/* 3) Zobrazení dat */}
      <h2>Seznam her:</h2>
      {/* Nebo pro „raw“ JSON: */}
      <pre>{JSON.stringify(games, null, 2)}</pre>
    </div>
  );
}

export default App;
