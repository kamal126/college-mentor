"use server";

import connectDB from "./connectDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Mentor, User } from "@/models/user.model";
import { z } from "zod";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

/* =======================
   Types
======================= */

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
  success?: boolean;
};

/* =======================
   Zod Schema
   (FormData-safe)
======================= */

const CreateExpertSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  companies: z.array(z.string()),
  experience: z.coerce.number().int().nonnegative(),
  bio: z.string().min(1, "Bio is required"),
  price: z.coerce.number().positive(),
  skills: z.array(z.string()),
});

/* =======================
   Server Action
======================= */

export async function createExpert(
  prevState: State,
  formData: FormData
): Promise<State> {
  await connectDB();

  /* ---------- Auth ---------- */
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { message: "Unauthorized" };
  }

  /* ---------- Validation ---------- */
  const parsed = CreateExpertSchema.safeParse({
    title: formData.get("title"),
    company: formData.get("company"),
    companies: formData.getAll("companies"),
    experience: formData.get("experience"),
    bio: formData.get("bio"),
    price: formData.get("price"),
    skills: formData.getAll("skills"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Missing or invalid fields",
    };
  }

  /* ---------- User ---------- */
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return { message: "User not found" };
  }

  /* ---------- Prevent duplicate mentor ---------- */
  const existingMentor = await Mentor.findOne({ user: user._id });
  if (existingMentor) {
    return { message: "You are already a mentor" };
  }

  /* ---------- Create Mentor ---------- */
  const mentorData = {
    user: user._id,
    fullName: user.fullName,
    avatar: user.avatar,
    title: parsed.data.title,
    company: parsed.data.company,
    companies: parsed.data.companies,
    experience: parsed.data.experience, // ✅ number
    bio: parsed.data.bio,
    price: parsed.data.price,
    skills: parsed.data.skills,
  };

  await Mentor.create(mentorData);
  await user.updateOne({ isMentor: true });

  /* ---------- Revalidate & Redirect ---------- */
  revalidatePath("/dashboard/mentor");
  redirect("/dashboard/mentor");
}

// export async function createUser(
//   prevState: State,
//   formData: FormData
// ): Promise<State> {
//   await connectDB();

//   const validated = userSchema.safeParse({
//     username: formData.get("username"),
//     fullName: formData.get("fullName"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//     avatar: formData.get("avatar") as File | null
//   });

//   if (!validated.success) {
//     return {
//       errors: validated.error.flatten().fieldErrors,
//       message: "Invalid fields",
//     };
//   }

//   const { username, avatar, password } = validated.data;

//   const hasUser = await User.findOne({ username });

//   if (hasUser) {
//     return {
//       message: "User Already exist",
//     };
//   }

//   const hashPassword = await bcrypt.hash(password, 10);

//   let avatarUrl = "";

//   if(avatar && avatar.size>0){
//     // server side valdatation
//     if(!["image/jpeg", "image/png", "image/webp"].includes(avatar.type)){
//       return {message: "Invalid image format."}
//     }

//     if(avatar.size > 2*1024*1024){
//       return {message: `Avatar too large ${avatar.size} accepable (max 2MB)`};
//     }

//     // convert file buffer
//     const bytes = await avatar.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // create temp path
//     const ext = avatar.name.split('.').pop();
//     const fileName = `${Date.now()}.${ext}`;
//     const tempDir = path.join(process.cwd(), "public", "temp");
//     await fs.mkdir(tempDir, { recursive: true });
//     const localFilePath = path.join(tempDir, fileName);

//     // write temp file
//     await writeFile(localFilePath, buffer);

//     // upload to clodinary
//     const uploaded = await uploadOnCloudinary(localFilePath);

//     if(!uploaded){
//       return{message:"Avatar upload failed"}
//     }

//     // await fs.unlink(localFilePath);

    

//     avatarUrl = uploaded.url;
//   }


//   const newuser = await User.create({
//     ...validated.data,
//     password: hashPassword,
//     avatar: avatarUrl,
//   });

//   if (!newuser) {
//     return{message: "user not created something went wrong."}
//   }

//   console.log("User created successfully");

//   redirect("/dashboard");
// }
// ============================================================
// =================== register user ==========================
// ============================================================

// export async function authenticate(
//   prevState: State | undefined,
//   formData: FormData
// ): Promise<State> {
//   try {
//     await signIn("credentials", formData);
//     return {success:true, message: null }; // ✅ success
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { message: "Invalid credentials" };
//         default:
//           return { message: "Something went wrong" };
//       }
//     }
//     throw error;
//   }
// }


