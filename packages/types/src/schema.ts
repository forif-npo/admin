import { z } from "zod";

export const formSchema = z.object({
  id: z.string().length(10, { message: "학번은 10자리여야 합니다." }),
  password: z.string().length(4, { message: "비밀번호는 4자리여야 합니다." }),
});

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
