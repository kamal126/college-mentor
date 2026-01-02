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

export const FormSchema = z.object({
  fullName: z.string().min(1, "Name required"),
  title: z.string().min(1, "Title required"),
  company: z.string().min(1, "company name is required"),
  companies: z.array(z.string()).min(1, "aAt least one company"),
  experience: z.coerce.number().min(0),
  bio: z.string().min(1),
  price: z.coerce.number().min(0),
  skills: z.array(z.string()).min(1, "At least one skill"),
});

export const userSchema = z.object({
  username: z.string().min(3, "Username is required"),
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  avatar: z.any().optional().nullable(),
});