import { useAuth } from "@/auth";
import type { wishlistType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface WishlistCardProps {
  gameId: string | undefined;
}

function WishlistCard({ gameId }: WishlistCardProps) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<wishlistType>();

  const addToWishlist = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/wishlist/${user?.id}/game/${gameId}`
      );
      setWishlist(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/wishlist/${user?.id}/game/${gameId}`
      );
      if (res) {
        setWishlist(undefined);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user?.id || !gameId) {
      return;
    }

    axios
      .get(`http://localhost:3000/api/wishlist/${user.id}/game/${gameId}`)
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [gameId, user]);

  if (!user) {
    return;
  }

  return (
    <div className="bg-gray-300 p-4 rounded-md w-fit min-w-40 space-y-2">
      <h5 className="font-semibold">Wishlist</h5>
      {wishlist?.id ? (
        <>
          <p>Game wishlisted</p>
          <Button onClick={removeFromWishlist}>Remove from wishlist</Button>
        </>
      ) : (
        <Button onClick={addToWishlist}>Add to wishlist</Button>
      )}
    </div>
  );
}

export default WishlistCard;
