import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Chat from "@/models/chat.model";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { chatId, senderId, text } = await req.json();

    if (!chatId || !senderId || !text?.trim()) {
      return NextResponse.json(
        { error: "Chat ID, sender ID, and text required." },
        { status: 400 }
      );
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          messages: {
            sender: new mongoose.Types.ObjectId(senderId),
            text: text.trim(),
            createdAt: new Date(),
          },
        },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );

    if (!updatedChat) {
      return NextResponse.json(
        { error: "Chat not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      chatId: updatedChat._id,
    });

  } catch (error: any) {
    console.error("Send message error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

