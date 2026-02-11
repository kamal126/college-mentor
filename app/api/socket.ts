// pages/api/socket.ts
import type { NextApiRequest } from "next";
import type { NextApiResponse } from "next";
import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";

// Next.js response type extend kar rahe hain
type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  // 🧠 Agar Socket.IO server pehle se exist karta hai
  if (!res.socket.server.io) {
    console.log("🔌 Starting Socket.IO server...");

    const io = new SocketIOServer(res.socket.server, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    // 👉 Connection event
    io.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);

      // Custom event listen
      socket.on("message", (data) => {
        console.log("📩 Message received:", data);

        // Sab clients ko bhejo
        io.emit("message", data);
      });

      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });
  }

  res.end();
}
