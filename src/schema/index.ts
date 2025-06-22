import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  email: z
    .string()
    .min(7, {
      message: "Enter complete email",
    })
    .email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const singInSchema = z.object({
  email: z
    .string()
    .min(7, {
      message: "Enter complete email",
    })
    .email(),
  password: z.string().min(8, {
    message: "Password must by at least 8 characters",
  }),
});

export const changeStatusSchema = z.object({
  newStatus: z.enum(["planned", "playing", "completed", "on_hold", "dropped"], {
    errorMap: () => ({
      message:
        "Status must be one of following: planned, playing, completed, on_hold, dropped",
    }),
  }),
});

export const createReviewSchema = z.object({
  rating: z.number(),
  reviewText: z.string(),
});
