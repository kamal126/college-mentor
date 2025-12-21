"use server";

import { z } from "zod";
import connectDB from "./connectDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1),
  companies: z.array(z.string()).min(1),
  experience: z.coerce.number().min(0),
  bio: z.string().min(1),
  rating: z.coerce.number().min(0).max(5),
  price: z.coerce.number().min(0),
  skills: z.array(z.string()).min(1),
  avatar: z.string().url(),
  status: z.coerce.boolean(),
  date: z.string(),
});

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

const CreateExpert = FormSchema.omit({ id: true, date: true });

export async function createExpert(
  prevState: State,
  formData: FormData
): Promise<State> {

  await connectDB(); // ✅ correct place

  const validatedFields = CreateExpert.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    companies: formData.getAll("companies"),
    experience: formData.get("experience"),
    bio: formData.get("bio"),
    rating: formData.get("rating"),
    price: formData.get("price"),
    skills: formData.getAll("skills"),
    avatar: formData.get("avatar"), // ✅ FIXED
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields.",
    };
  }

  const data = validatedFields.data;

  try {
    // ✅ Example DB insert
    await User.create(data);

  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Expert.",
    };
  }

  console.log(formData);

  revalidatePath("/dashboard/mentor");
  redirect("/dashboard/mentor");
}

const userSchema = z.object({
  username: z.string().min(3, "Username is required"),
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function createUser(
  prevState: State,
  formData: FormData
): Promise<State> {
  await connectDB();

  const validated = userSchema.safeParse({
    username: formData.get("username"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid fields",
    };
  }

  const {username} = validated.data;

  const hasUser = await User.findOne({username});

  if(hasUser){
    return{
      message: "User Already exist"
    }
  }

  const hashPassword = await bcrypt.hash(validated.data.password, 10);

  const newuser = await User.create({...validated.data, password: hashPassword,});

  if(!newuser){
    
  }
  
  console.log("User created successfully");
  
  redirect("/query");
  
}

