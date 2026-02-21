import connectDB from "@/lib/connectDB";
import Chat from "@/models/chat.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const mentorId = searchParams.get("mentorId");

        if (!mentorId) {
            return NextResponse.json(
                { error: "mentorId required" },
                { status: 400 }
            );
        }

        const mentorObjectId = new mongoose.Types.ObjectId(mentorId);

        const chats = await Chat.find({
            participants: mentorObjectId,
        })
        .sort({ updatedAt: -1 })
        .lean();

        const formattedChats = chats.map((chat) => {
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

        return NextResponse.json({ chats: formattedChats });

    } catch (err: any) {
        console.error("INBOX ERROR", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}

