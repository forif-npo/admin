"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@repo/types/src/schema";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../../../../../packages/ui/src/components/ui/use-toast";
import { signIn } from "../../actions/sign-in.server";
import { useAuthStore } from "../../store/useAuthStore";
import { Icons } from "../icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AuthForm({ className, ...props }: UserAuthFormProps) {
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // 로그인 시작
    const { data, error } = await signIn(values);
    // 유저 정보 및 access token 전역 변수 저장
    setUser(data);
    setIsLoading(false);
    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } else {
      router.push("/dashboard", {
        scroll: false,
      });
    }
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="h-11">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="2023063845"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="h-11">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      autoComplete="off"
                      placeholder="****"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-6"></div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </div>
        </form>
      </Form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div> */}
    </div>
  );
}
