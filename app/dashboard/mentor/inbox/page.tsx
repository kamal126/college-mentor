"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ChatPreview {
    chatId: string;
    participants: string[];
    lastMessage: {
        text: string;
        sender: string;
        createdAt: string;
    } | null;
    updatedAt: string;
}

export default function MentorInbox() {
    const { data: session } = useSession();
    const [chats, setChats] = useState<ChatPreview[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const mentorId = session?.user?.id;

    useEffect(() => {
        if (!mentorId) return;

        async function fetchInbox() {
            try {
                setLoading(true);
                const res = await fetch(`/api/chat/inbox?mentorId=${mentorId}`);

                console.log(res);

                if (!res.ok) throw new Error("Fetch failed");

                const data = await res.json();
                setChats(data.chats || []);
            } catch (err) {
                console.error(err);
                setChats([]);
            } finally {
                setLoading(false);
            }
        }

        fetchInbox();
    }, [mentorId]);

    return (
        <div className="h-screen bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-6">Mentor Inbox</h1>

            {loading ? (
                <p>Loading...</p>
            ) : chats.length === 0 ? (
                <p>No chats found</p>
            ) : (
                <div className="space-y-3 overflow-y-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.chatId}
                            onClick={() =>
                                router.push(`/dashboard/mentor/${chat.chatId}/chat`)
                            }
                            className="p-4 bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-700 transition"
                        >
                            <p className="font-semibold">
                                Chat ID: {chat.chatId.slice(-6)}
                            </p>

                            {chat.lastMessage ? (
                                <p className="text-gray-400 text-sm">
                                    {chat.lastMessage.text}
                                </p>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No message yet
                                </p>
                            )}

                            <p className="text-xs text-gray-500 mt-1">
                                {new Date(chat.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
