"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Message {
  _id: string;
  sender: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface Chat {
  chatId: string;
  participants: string[];
  lastMessage: Message | null;
  updatedAt: string;
}

export default function InboxPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/signin");
    }
  }, [session, status, router]);

  // ✅ Fetch chats only when session ready
  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchChats = async () => {
      try {
        const res = await fetch(
          `/api/chat/inbox?mentorId=${session.user.id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch chats");
        }

        const data = await res.json();
        setChats(data.chats);
      } catch (error) {
        console.error("Failed to fetch chats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading chats...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>

      <div className="space-y-3">
        {chats.length === 0 && (
          <p className="text-gray-500">No chats found.</p>
        )}

        {chats.map((chat) => {
          // show only other participant
          const otherUser = chat.participants.find(
            (id) => id !== session?.user.id
          );

          return (
            <div
              key={chat.chatId}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition"
            >
              {/* Other User */}
              <p className="text-sm text-gray-500">
                User: {otherUser}
              </p>

              {/* Last Message */}
              <p className="mt-2 font-medium">
                {chat.lastMessage
                  ? chat.lastMessage.text
                  : "No messages yet"}
              </p>

              {/* Time */}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(chat.updatedAt).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}