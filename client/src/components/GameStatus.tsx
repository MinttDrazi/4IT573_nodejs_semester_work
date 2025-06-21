import { useAuth } from "@/auth";
import type { libraryType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import StatusForm from "./StatusForm";
import { Button } from "./ui/button";

interface GameStatusProps {
  gameId: string | undefined;
}

function GameStatus({ gameId }: GameStatusProps) {
  const { user } = useAuth();
  const [status, setStatus] = useState<libraryType>();

  const removeStatus = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/library/${user?.id}/game/${gameId}`
      );
      if (res) {
        setStatus(undefined);
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
      .get(`http://localhost:3000/api/library/${user?.id}/game/${gameId}`)
      .then((res) => {
        setStatus(res.data);
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
      <h5 className="font-semibold">Status</h5>
      <StatusForm initialStatus={status?.status} gameId={gameId} />
      <Button onClick={removeStatus}>Remove Status</Button>
    </div>
  );
}

export default GameStatus;
