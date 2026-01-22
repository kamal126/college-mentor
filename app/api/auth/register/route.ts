export const runtime = "nodejs";

import { uploadOnCloudinary } from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const formData = await request.formData();

    const username = formData.get("username")?.toString();
    const fullName = formData.get("fullName")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const avatar = formData.get("avatar") as File | null;

    /* =====================
       Basic validation
    ===================== */

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    /* =====================
       User exists check
    ===================== */

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    /* =====================
       Password hashing
    ===================== */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* =====================
       Avatar upload
    ===================== */

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

      const buffer = Buffer.from(await avatar.arrayBuffer());

      const fileExt = path.extname(avatar.name) || ".jpg";
      const fileName = `${crypto.randomUUID()}${fileExt}`;
      const tempDir = path.join(process.cwd(), "public", "temp");
      const tempPath = path.join(tempDir, fileName);

      await fs.mkdir(tempDir, { recursive: true });

      try {
        await fs.writeFile(tempPath, buffer);

        const uploaded = await uploadOnCloudinary(tempPath);
        if (!uploaded?.url) {
          throw new Error("Cloudinary upload failed");
        }

        avatarUrl = uploaded.url;
      } finally {
        // ✅ Always cleanup temp file
        await fs.unlink(tempPath).catch(() => {});
      }
    }

    /* =====================
       Create user
    ===================== */

    const user = await User.create({
      username,
      fullName,
      email,
      avatar: avatarUrl,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        userId: user._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
