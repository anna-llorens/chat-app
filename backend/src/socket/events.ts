import { DisconnectReason } from "socket.io";
import { addMessage, getChatHistory } from "../services/chat-service.js";

const onlineUsers = new Set();

export const setupSocketHandlers = (io: any, socket: any) => {
  const userId = socket.handshake?.query?.userId;
  if (userId) {
    onlineUsers.add(userId);
    // Send the current list of online users to the newly connected client
    socket.emit("onlineUsers", Array.from(onlineUsers));
    // Notify all other clients about the new online user
    socket.broadcast.emit("userOnline", userId);
    console.log(new Date(), "Online users:", onlineUsers)
  }

  socket.on('join', async (chatId: string) => {
    try {
      console.log(`User joined room: ${chatId}`);
      socket.join(chatId);
      const history = await getChatHistory(chatId);
      socket.emit("history", history);
    } catch (error) {
      console.error(new Date(), "Error retrieving message history:", error);
      socket.emit("errorMessage", { error: "Failed to retrieve message history." });
    }
  });

  socket.on("message", async (data: any) => {
    try {
      const message = await addMessage(data);
      io.to(data.chatId).emit("newMessage", message);
    } catch (error) {
      console.error(new Date(), "Error handling message:", error);
      socket.emit("errorMessage", { error: "Failed to process message." });
    }
  })

  socket.on('disconnect', (reason: DisconnectReason) => {
    const userId = socket.handshake.query.userId;
    console.log(new Date(), 'User diconnected id:', userId, reason);
    onlineUsers.delete(userId);
    io.emit("userOffline", userId);
  });
}