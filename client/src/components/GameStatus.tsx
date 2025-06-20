import { useAuth } from "@/auth";
import axios from "axios";
import { useEffect, useState } from "react";

interface GameStatusProps {
  gameId: string | undefined;
}

function GameStatus({ gameId }: GameStatusProps) {
  const { user } = useAuth();
  const [status, setStatus] = useState<object>();

  useEffect(() => {
    if (!user?.id || !gameId) {
      return;
    }

    // asynchronní pomocná funkce uvnitř effectu
    const fetchStatus = async () => {
      console.log(user?.id, user?.email);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/games/${gameId}/status?userId=${user?.id}`
        );
        setStatus(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();
    // závislosti – efekt se spustí znovu, až se změní user.id nebo gameId
  }, [gameId, user]);

  if (!user) {
    return;
  }

  return (
    <div className="bg-blue-100 p-2 rounded-md w-fit my-4">
      <h5 className="font-semibold">Status</h5>
      {/* <button onClick={fetchStatus}>Fetch</button> */}
      <p>{status?.status}</p>
    </div>
  );
}

export default GameStatus;
