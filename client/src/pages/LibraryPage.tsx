import { useAuth } from "@/auth";
import GameCard from "@/components/GameCard";
import H1Heading from "@/components/typography/H1Heading";
import PageLayout from "@/layouts/PageLayout";
import type { gameType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

function LibraryPage() {
  const { user } = useAuth();
  const [games, setGames] = useState<gameType[]>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/library/${user?.id}`)
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <PageLayout>
      <H1Heading>Library</H1Heading>
      <div className="grid grid-cols-6 gap-6">
        {games?.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
    </PageLayout>
  );
}

export default LibraryPage;
