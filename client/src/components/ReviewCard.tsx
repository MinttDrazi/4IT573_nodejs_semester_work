import type { reviewType } from "@/types";
import { Star } from "lucide-react";

function ReviewCard({ review }: { review: reviewType }) {
  return (
    <div className="bg-gray-200 p-4 rounded-md space-y-4">
      <div className="flex">
        {Array.from({ length: review.rating }, (_, i) => (
          <Star key={i} size={18} fill="black" />
        ))}
        {Array.from({ length: 10 - review.rating }, (_, i) => (
          <Star key={i} size={18} />
        ))}
      </div>
      <p>{review.reviewText}</p>
    </div>
  );
}

export default ReviewCard;
