import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import PageLayout from "@/layouts/PageLayout";
import { NavLink } from "react-router";

const formSchema = z.object({
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

export function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signin",
        data
      );
      console.log(response);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.status, err.response?.data.error);
      } else {
        console.error(err);
      }
    }
  }

  return (
    <PageLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
      <p className="pt-4">
        Not have a account? Register{" "}
        <NavLink to="/register" className="text-blue-500">
          here
        </NavLink>
      </p>
    </PageLayout>
  );
}
