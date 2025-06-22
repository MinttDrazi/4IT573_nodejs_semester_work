import axios from "axios";
import { Button } from "./ui/button";

function DeleteReview({
  userId,
  gameId,
}: {
  userId: number;
  gameId: string | undefined;
}) {
  async function deleteReviewOnClick() {
    if (!gameId) {
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/review/${userId}/game/${gameId}`
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return <Button onClick={deleteReviewOnClick}>Delete</Button>;
}

export default DeleteReview;
