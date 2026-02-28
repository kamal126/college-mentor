import connectDB from "@/lib/connectDB";
import Chat from "@/models/chat.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
    // console.log("API HIT");
  try {
    // 1️⃣ Connect Database
    await connectDB();

    // 2️⃣ Get mentorId from query params
    const { searchParams } = new URL(req.url);
    const mentorId = searchParams.get("mentorId");

    // 3️⃣ Check if mentorId exists
    if (!mentorId) {
      return NextResponse.json(
        { error: "mentorId is required" },
        { status: 400 }
      );
    }

    // 4️⃣ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return NextResponse.json(
        { error: "Invalid mentorId format" },
        { status: 400 }
      );
    }

    const mentorObjectId = new mongoose.Types.ObjectId(mentorId);

    // 5️⃣ Find chats where mentor is participant
    const chats = await Chat.find({
      participants: mentorObjectId,
    })
      .sort({ updatedAt: -1 })
      .lean();

    // 6️⃣ Format chats
    const formattedChats = chats.map((chat: any) => {
      const lastMessage =
        chat.messages && chat.messages.length > 0
          ? chat.messages[chat.messages.length - 1]
          : null;

      return {
        chatId: chat._id.toString(),
        participants: chat.participants,
        lastMessage,
        updatedAt: chat.updatedAt,
      };
    });

    // 7️⃣ Return response
    return NextResponse.json(
      { chats: formattedChats },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("INBOX ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}