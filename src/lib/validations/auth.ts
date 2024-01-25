import * as z from "zod";

export const userAuthSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(6, { message: "min 8 characters" })
    .max(20, { message: "max 20 characters" })
    .refine(
      (val) => {
        return !val.includes("!");
      },
      { message: "Not Allow contains !" }
    ),
  password: z.string().min(6).max(20),
});
