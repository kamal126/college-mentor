"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import connectDB from "./connectDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Mentor, User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { uploadOnCloudinary } from "./cloudinary";
import path from "path";
import { writeFile } from "fs/promises";
import fs from 'fs/promises';
import { FormSchema, userSchema } from "@/models/Scehma";

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
  success?: boolean;
};

const CreateExpert = FormSchema.omit({ fullName: true, date: true });
export async function createExpert(
  prevState: State,
  formData: FormData
): Promise<State> {
  await connectDB();

  const validatedFields = CreateExpert.safeParse({
    fullName: formData.get("fullName"),
    title: formData.get("title"),
    company: formData.get("company"),
    companies: formData.getAll("companies"),
    experience: formData.get("experience"),
    bio: formData.get("bio"),
    price: formData.get("price"),
    skills: formData.getAll("skills"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields.",
    };
  }

  const data = validatedFields.data;

  const session = await auth();

  if (!session?.user) {
    return { message: "Unauthorized" };
  }

  const user = await User.findOne({ email: session?.user.email });

  const mentor = await Mentor.findOne({ user: user?._id });
  if (mentor) {
    return { message: "You'r alredy Joined..." };
  }

  console.log(user);
  console.log(data);

  const expert = {
    user: user?._id, // ✅ MATCHES SCHEMA
    fullName: user?.fullName,
    title: data.title,
    company: data.company,
    companies: data.companies,
    experience: data.experience,
    bio: data.bio,
    price: data.price,
    skills: data.skills,
    avatar: user?.avatar,
  };

  await Mentor.create(expert);

  // (await cookies()).set("mentor","true",{
  //   httpOnly:true
  // });
  await user?.updateOne({isMentor:true});

  console.log(data);
  console.log(user);

  revalidatePath("/dashboard/mentor");
  redirect("/dashboard/mentor");
}

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
    avatar: formData.get("avatar") as File | null
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid fields",
    };
  }

  const { username, avatar, password } = validated.data;

  const hasUser = await User.findOne({ username });

  if (hasUser) {
    return {
      message: "User Already exist",
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  let avatarUrl = "";

  if(avatar && avatar.size>0){
    // server side valdatation
    if(!["image/jpeg", "image/png", "image/webp"].includes(avatar.type)){
      return {message: "Invalid image format."}
    }

    if(avatar.size > 2*1024*1024){
      return {message: `Avatar too large ${avatar.size} accepable (max 2MB)`};
    }

    // convert file buffer
    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // create temp path
    const ext = avatar.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const tempDir = path.join(process.cwd(), "public", "temp");
    await fs.mkdir(tempDir, { recursive: true });
    const localFilePath = path.join(tempDir, fileName);

    // write temp file
    await writeFile(localFilePath, buffer);

    // upload to clodinary
    const uploaded = await uploadOnCloudinary(localFilePath);

    if(!uploaded){
      return{message:"Avatar upload failed"}
    }

    // await fs.unlink(localFilePath);

    

    avatarUrl = uploaded.url;
  }


  const newuser = await User.create({
    ...validated.data,
    password: hashPassword,
    avatar: avatarUrl,
  });

  if (!newuser) {
    return{message: "user not created something went wrong."}
  }

  console.log("User created successfully");

  redirect("/signin");
}
// ============================================================
// =================== register user ==========================
// ============================================================

export async function authenticate(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  try {
    await signIn("credentials", formData);
    return {success:true, message: null }; // ✅ success
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials" };
        default:
          return { message: "Something went wrong" };
      }
    }
    throw error;
  }
}


