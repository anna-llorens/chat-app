
const onlineUsers = new Set();
export const setupSocketHandlers = (io: any, socket: any) => {
  const userId = socket.handshake?.query?.userId;
  console.log(new Date(), 'User connected id:', userId);
  if (userId) {
    onlineUsers.add(userId);
    // Send the current list of online users to the newly connected client
    socket.emit("onlineUsers", Array.from(onlineUsers));
    // Notify all other clients about the new online user
    socket.broadcast.emit("userOnline", userId);
    console.log(new Date(), "Online users:", onlineUsers)
  }
}