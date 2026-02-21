import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Chat from "@/models/chat.model";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId, mentorId } = await req.json();
    // console.log(userId, mentorId);

    if (!userId || !mentorId) {
      return NextResponse.json(
        { error: "userId and mentorId required" },
        { status: 400 },
      );
    }

    const u1 = new mongoose.Types.ObjectId(userId);
    const u2 = new mongoose.Types.ObjectId(mentorId);

    // Check if chat already exists
    let chat = await Chat.findOne({
      participants: { $all: [u1, u2]},
    });

    // If not exists → create new
    if (!chat) {
      chat = await Chat.create({
        participants: [u1, u2],
        messages: [],
      });
    }

    // console.log(chat._id.toString());

    return NextResponse.json({
      success: true,
      chatId: chat._id.toString(),
      chat
    });
  } catch (err: any) {
    console.error("CREATE CHAT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
