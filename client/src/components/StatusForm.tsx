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
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/auth";

const statuses = [
  {
    value: "planned",
    text: "Planned",
  },
  {
    value: "playing",
    text: "Playing",
  },
  {
    value: "completed",
    text: "Completed",
  },
  {
    value: "on_hold",
    text: "On hold",
  },
  {
    value: "dropped",
    text: "Dropped",
  },
];

const formSchema = z.object({
  status: z.string(),
});

function StatusForm({
  initialStatus,
  gameId,
}: {
  initialStatus: string | undefined;
  gameId: string | undefined;
}) {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: initialStatus ? initialStatus : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      newStatus: values.status,
    };
    try {
      const res = await axios.post(
        `http://localhost:3000/api/library/${user?.id}/game/${gameId}`,
        data
      );
      console.log(res);
      initialStatus = res.data.status;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (initialStatus !== undefined) {
      form.reset({ status: initialStatus });
    }
  }, [initialStatus, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Change</Button>
      </form>
    </Form>
  );
}

export default StatusForm;
