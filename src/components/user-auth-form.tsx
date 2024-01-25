"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
      callbackUrl: searchParams?.get("callbackUrl") || "/",
    });

    setIsLoading(false);

    console.log("signInResult", signInResult);

    if (!signInResult?.ok || signInResult?.error) {
      return toast({
        title: signInResult?.error ?? "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      title: "Login Success",
    });

    if (signInResult?.url) {
      router.push(signInResult.url);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username")}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="password"
              disabled={isLoading || isGoogleLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button variant="default" disabled={isLoading}>
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google", {
            redirect: true,
            callbackUrl: searchParams?.get("callbackUrl") || "/",
          });
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Image
            src="/google-icon.png"
            width={16}
            height={16}
            alt="google icon"
            className="mr-2"
          />
        )}{" "}
        google
      </button>
    </div>
  );
}
