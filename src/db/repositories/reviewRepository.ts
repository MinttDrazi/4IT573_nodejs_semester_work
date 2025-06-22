import { and, eq } from "drizzle-orm";
import { db } from "../connection";
import { reviewsTable } from "../schema";

export async function getReviewsByGameId(gameId: number) {
  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.gameId, gameId))
    .all();

  return reviews;
}

export async function getReviewByGameAndUser(userId: number, gameId: number) {
  const review = await db
    .select()
    .from(reviewsTable)
    .where(
      and(eq(reviewsTable.userId, userId), eq(reviewsTable.gameId, gameId))
    )
    .get();
  return review;
}

export async function createReview(
  userId: number,
  gameId: number,
  data: { rating: number; reviewText: string }
) {
  const review = await db
    .insert(reviewsTable)
    .values({
      userId: userId,
      gameId: gameId,
      rating: data.rating,
      reviewText: data.reviewText,
    })
    .returning()
    .get();

  return review;
}

export async function updateReview(
  id: number,
  data: { rating: number; reviewText: string }
) {
  const review = await db
    .update(reviewsTable)
    .set({
      rating: data.rating,
      reviewText: data.reviewText,
    })
    .where(eq(reviewsTable.id, id))
    .returning()
    .get();
  return review;
}

export async function deleteReview(id: number) {
  const review = db.delete(reviewsTable).where(eq(reviewsTable.id, id));
  return review;
}
