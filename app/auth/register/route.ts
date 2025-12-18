import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { User } from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, email, fullName, password, avatar } = await req.json();

    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({
      username,
      email,
      fullName,
      password,
      avatar,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
