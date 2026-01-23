import connectDB from "@/lib/connectDB";
import { Mentor, User } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const exists = await Mentor.findOne({ user: session.user.id });
    if (exists) {
      return NextResponse.json({ message: "Mentor already exists" }, { status: 400 });
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const formData = await request.formData();

    // ✅ Extract variables first
    const fullName = (formData.get("fullName") as string) || user.fullName;
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const companies = formData.getAll("companies") as string[];
    const experience = Number(formData.get("experience"));
    const bio = formData.get("bio") as string;
    const price = Number(formData.get("price"));
    const skills = formData.getAll("skills") as string[];
    const avatar = user.avatar;

    // ✅ Then create mentor
    const mentor = await Mentor.create({
      user: session.user.id,
      fullName,
      title,
      company,
      companies,
      experience,
      bio,
      price,
      skills,
      avatar,
    });

    await User.findByIdAndUpdate(session.user.id, { isMentor: true });

    return NextResponse.json({ message: "Mentor created", mentor }, { status: 201 });
  } catch (error) {
    console.error("Mentor create error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
