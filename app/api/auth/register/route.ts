export const runtime = "nodejs";

import { uploadOnCloudinary } from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const formData = await request.formData();

    const username = formData.get("username") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const avatar = formData.get("avatar") as File | null;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    let avatarUrl = "";

    if (avatar && avatar.size > 0) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(avatar.type)) {
        return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
      }

      if (avatar.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: "Avatar must be < 2MB" }, { status: 400 });
      }

      const bytes = await avatar.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = avatar.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const tempDir = path.join(process.cwd(), "public", "temp");
      await fs.mkdir(tempDir, { recursive: true });

      const localFilePath = path.join(tempDir, fileName);
      await fs.writeFile(localFilePath, buffer);

      const uploaded = await uploadOnCloudinary(localFilePath);
      await fs.unlink(localFilePath);

      if (!uploaded) {
        return NextResponse.json({ error: "Avatar upload failed" }, { status: 500 });
      }

      avatarUrl = uploaded.url;
    }

    const newUser = await User.create({
      username,
      fullName,
      email,
      avatar: avatarUrl,
      password: hashPassword,
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
