import { useAuth } from "@/auth";
import GameCard from "@/components/GameCard";
import PageLayout from "@/layouts/PageLayout";
import axios from "axios";
import { useEffect, useState } from "react";

function LibraryPage() {
  const { user } = useAuth();
  const [games, setGames] =
    useState<
      { id: string; title: string; description: string; image: string }[]
    >();

  useEffect(() => {
    const fetchLibary = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/library/${user?.id}`
        );
        console.log(res.data);
        setGames(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLibary();
  }, [user]);

  return (
    <PageLayout>
      <h1>Library</h1>
      <div className="grid grid-cols-6 gap-6">
        {games?.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
    </PageLayout>
  );
}

export default LibraryPage;
