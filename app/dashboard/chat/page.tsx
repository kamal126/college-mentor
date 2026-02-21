"use client";

import Breadcrumbs from "@/components/expert/breadcrumbs";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function Chat() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-[#0F172A]">
        <p className="animate-pulse text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-[#0F172A] text-red-500">
        Access Denied!
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Simulated bot reply
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "This is a demo reply 🚀",
          sender: "bot",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-black/20 dark:via-gray-900 dark:to-black/30 transition-colors duration-500">

      <div className="px-6 pt-4">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/dashboard", active: false },
            { label: "Chat", href: "/dashboard/AI/chat", active: true },
          ]}
        />
      </div>

      <h2 className="text-center text-2xl font-semibold mt-4 text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-indigo-400 dark:to-cyan-400">
        Hi {session?.user.fullName} <span className="text-red-400">👋</span>
      </h2>

      {/* Chat Area */}
      <div className="flex-1 mx-6 my-6 p-6 rounded-2xl bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-xl overflow-y-auto space-y-4 transition-all duration-500">

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl shadow-md ${
                  msg.sender === "user"
                    ? "bg-linear-to-r from-indigo-500 to-cyan-500 text-white"
                    : "bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-200 dark:bg-white/10 flex gap-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 px-6 pb-6"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-white/20 bg-white dark:bg-white/10 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          // className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/30 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
        >
          Send
        </motion.button>
      </form>
    </div>
  );
}
