import { useAuth } from "@/auth";
import axios from "axios";
import { useEffect, useState } from "react";

interface WishlistCardProps {
  gameId: string | undefined;
}

function WishlistCard({ gameId }: WishlistCardProps) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<object>();

  const addToWishlist = async () => {
    const data = { gameId: gameId };
    try {
      const res = await axios.post(
        `http://localhost:3000/api/wishlist/${user?.id}`,
        data
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/wishlist/${user?.id}/game/${gameId}`
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user?.id || !gameId) {
      return;
    }

    // asynchronní pomocná funkce uvnitř effectu
    const fetchWishlist = async () => {
      console.log(user?.id, user?.email);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/games/${gameId}/wishlist?userId=${user?.id}`
        );
        setWishlist(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
    // závislosti – efekt se spustí znovu, až se změní user.id nebo gameId
  }, [gameId, user]);

  if (!user) {
    return;
  }

  if (!wishlist) {
    return (
      <div>
        <button onClick={addToWishlist}>Add to wishlist</button>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 p-2 rounded-md w-fit my-4">
      <h5 className="font-semibold">Wishlist</h5>
      {/* <button onClick={fetchStatus}>Fetch</button> */}
      <p>{wishlist?.gameId && "true"}</p>
      <button onClick={removeFromWishlist}>Remove from wishlist</button>
    </div>
  );
}

export default WishlistCard;
