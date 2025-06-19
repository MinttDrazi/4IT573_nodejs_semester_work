import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

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
    <div className="bg-accent">
      <h1>Homepage New</h1>
      <Button onClick={apiCall} className="hover:cursor-pointer">
        Načíst hry
      </Button>
      <NavLink to="/about">About us</NavLink>
      {/* 3) Zobrazení dat */}
      <h2>Seznam her:</h2>
      {/* Nebo pro „raw“ JSON: */}
      <pre>{JSON.stringify(games, null, 2)}</pre>
    </div>
  );
}

export default App;
