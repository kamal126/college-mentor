// app/api/auth/register/route.ts
export const runtime = "nodejs";

import { uploadOnCloudinary } from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Connect to DB
    await connectDB();

    // 2️⃣ Parse form data
    const formData = await request.formData();
    const username = formData.get("username")?.toString();
    const fullName = formData.get("fullName")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const avatar = formData.get("avatar") as File | null;

    // 3️⃣ Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    // 4️⃣ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Avatar upload (serverless-safe)
    let avatarUrl = "";
    if (avatar && avatar.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(avatar.type)) {
        return NextResponse.json(
          { error: "Only JPG, PNG, or WEBP images are allowed" },
          { status: 400 }
        );
      }

      if (avatar.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Avatar must be smaller than 2MB" },
          { status: 400 }
        );
      }

      try {
        const buffer = Buffer.from(await avatar.arrayBuffer());
        const uploaded = await uploadOnCloudinary(buffer, avatar.name);
        if (uploaded?.url) {
          avatarUrl = uploaded.url;
        } else {
          console.warn("Avatar upload failed, continuing without avatar");
        }
      } catch (err) {
        console.error("Avatar upload error:", err);
      }
    }

    // 7️⃣ Create user
    const user = await User.create({
      username,
      fullName,
      email,
      avatar: avatarUrl,
      password: hashedPassword,
    });

    // 8️⃣ Success response
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        userId: user._id,
        avatar: avatarUrl || null,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
