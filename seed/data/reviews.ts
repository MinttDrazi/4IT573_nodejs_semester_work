import { reviewType } from "../../src/db/model/reviewModel";

export const reviewsRecords: reviewType[] = [
  {
    id: 1,
    userId: 1,
    gameId: 1,
    rating: 6,
    reviewText: "Sample text",
  },
  {
    id: 2,
    userId: 2,
    gameId: 1,
    rating: 7,
    reviewText: "Sample text by another user",
  },
];
