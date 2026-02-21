"use client";

import Breadcrumbs from "@/components/expert/breadcrumbs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Message {
  sender: string;
  text: string;
  createdAt: string;
}

export default function Chat() {
  const { data: session, status } = useSession();
  const params = useParams();
  const mentorId = params?.id;
  const userId = session?.user?.id;

  const [chatId, setChatId] = useState<string | null>(null);
  const [mentorName, setMentorName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch mentor info and create chat
  useEffect(() => {
    if (!mentorId || !userId) return;

    async function fetchMentor() {
      try {
        const res = await fetch(`/api/expert/${mentorId}`);
        if (!res.ok) throw new Error("Failed to fetch mentor");
        const data = await res.json();
        setMentorName(data.name);
      } catch (err) {
        toast.error("Failed to load mentor");
      }
    }

    async function createChat() {
      try {
        const res = await fetch("/api/chat/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mentorId, userId }),
        });
        if (!res.ok) throw new Error("Failed to create chat");
        const data = await res.json();
        if (data?.chat?._id) setChatId(data.chat._id.toString());
      } catch (err) {
        toast.error("Failed to create chat");
      }
    }

    fetchMentor();
    createChat();
  }, [mentorId, userId]);

  // Fetch chat messages
  useEffect(() => {
    if (!chatId) return;

    async function fetchMessages() {
      try {
        const res = await fetch(`/api/chat/${chatId}`);
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data: Message[] = await res.json();
        setMessages(data);
      } catch (err) {
        toast.error("Failed to load messages");
      }
    }

    fetchMessages();
  }, [chatId]);

  // Send message
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !chatId || !userId) return;

    const newMessage: Message = {
      sender: userId,
      text: message,
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, senderId: userId, text: newMessage.text }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      // Optional: update messages with server response if needed
      // const data = await res.json();
      // setMessages(data.updatedChat.messages);
    } catch (err) {
      toast.error("Message failed to send");
    }
  };

  // Loading and unauthenticated states
  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0F172A] text-white">
        <p className="animate-pulse text-lg">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0F172A] text-red-400 text-xl">
        Access Denied!
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-[#0F172A] via-[#111827] to-[#1E293B] text-white">
      <div className="px-6 pt-4">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/dashboard", active: false },
            { label: "Mentor", href: "/dashboard/mentor", active: false },
            { label: "Chat", href: "/dashboard/mentor/chat", active: true },
          ]}
        />
      </div>

      <h2 className="text-3xl font-semibold text-center mt-4 bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Hi {session?.user.fullName} <span className="text-red-400">👋</span> I&apos;m{" "}
        {mentorName}
      </h2>

      {/* Chat Container */}
      <div className="flex-1 mx-6 my-6 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-y-auto space-y-4">
        {messages.map((msg, i) => {
          const isOwnMessage = msg.sender === userId;
          return (
            <div
              key={i}
              className={`max-w-fit px-4 py-2 rounded-2xl shadow-lg ${
                isOwnMessage ? "ml-auto bg-indigo-500" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="flex items-center gap-4 px-6 pb-6">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 md:px-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
        <button
          type="submit"
          className="md:px-6 px-3 py-3 rounded-full bg-linear-to-r from-indigo-500 to-cyan-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-indigo-500/30"
        >
          Send
        </button>
      </form>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}