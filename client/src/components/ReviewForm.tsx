import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import type { reviewType } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  rating: z.string(),
  reviewText: z.string(),
});

function ReviewForm({
  initialReview,
  userId,
  gameId,
}: {
  initialReview: reviewType | undefined;
  userId: number;
  gameId: string | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: initialReview ? initialReview.rating.toString() : "",
      reviewText: initialReview ? initialReview.reviewText : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (initialReview) {
      try {
        const res = await axios.put(
          `http://localhost:3000/api/review/${userId}/game/${gameId}`,
          values
        );
        console.log("Updated:", res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/review/${userId}/game/${gameId}`,
          values
        );
        console.log("Created:", res.data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    form.reset({
      rating: initialReview?.rating.toString(),
      reviewText: initialReview?.reviewText,
    });
  }, [initialReview, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select your rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reviewText"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write your review"
                  className="resize-none bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ReviewForm;
