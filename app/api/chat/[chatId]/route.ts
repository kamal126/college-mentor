import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Chat from "@/models/chat.model";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ chatId: string }> }
) {
  try {
    await connectDB();

    // ✅ Await params
    const { chatId } = await context.params;

    if (!chatId) {
      return NextResponse.json(
        { error: "chatId missing" },
        { status: 400 }
      );
    }

    const chat = await Chat.findById(chatId).lean();

    if (!chat) {
      return NextResponse.json(
        { error: "Chat not found" },
        { status: 404 }
      );
    }

    // console.log("CHAT", chat)

    return NextResponse.json(chat.messages);

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
