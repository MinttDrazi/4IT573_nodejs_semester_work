import { useAuth } from "@/auth";
import type { reviewType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

function ReviewSection({ gameId }: { gameId: string | undefined }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<reviewType[]>();

  useEffect(() => {
    if (!gameId) {
      return;
    }

    axios
      .get(`http://localhost:3000/api/review/${gameId}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [gameId]);

  const userReview = reviews?.find((review) => review.userId === user?.id);

  return (
    <div className="bg-gray-300 p-8 rounded-md w-full space-y-10">
      <div>
        {user && (
          <>
            <ReviewForm
              initialReview={userReview}
              userId={user.id}
              gameId={gameId}
            />
            <div className="h-2 bg-black mt-10 rounded-xl" />
          </>
        )}
      </div>
      {reviews?.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

export default ReviewSection;
