import { z } from "zod";

export const expertSchema = z.object({
  username: z.string().min(1),

  role: z.string().min(1),

  company: z.string().min(1),

  experience: z.coerce.number().min(0).optional(),

  price: z.coerce.number().min(1).max(20),

  bio: z.string().min(20).max(200).optional(),

  pastCompanies: z.array(z.string()).default([]),

  rating: z.number().default(0),

  img: z.string().url().optional(),

  active: z.boolean().default(true),
});

export type Expert = z.infer<typeof expertSchema>;
