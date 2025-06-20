import { useAuth } from "@/auth";
import GameCard from "@/components/GameCard";
import PageLayout from "@/layouts/PageLayout";
import axios from "axios";
import { useEffect, useState } from "react";

function WishlistPage() {
  const { user } = useAuth();
  const [games, setGames] = useState<
    {
      id: string;
      title: string;
      description: string;
      image: string;
    }[]
  >([]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchWishlist = async () => {
      console.log(user.id);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/wishlist/${user.id}`
        );
        console.log(res.data);
        setGames(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishlist();
  }, [user]);

  return (
    <PageLayout>
      <h1>Wishlist</h1>
      <div className="grid grid-cols-6 gap-6">
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
    </PageLayout>
  );
}

export default WishlistPage;
