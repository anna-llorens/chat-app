import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import userRoutes from './routes/user-routes.js';
import cors from "cors";
import { setupSocketHandlers } from './socket/events.js';
import prisma from './prisma.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

app.get('/', (_req, res) => {
  res.send("Server is running");
});

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});
io.on('connection', (socket) => {
  setupSocketHandlers(io, socket);


  socket.on('join', (chatId) => {
    console.log(`User joined chat: ${chatId}`);
    socket.join(chatId); // Join the room
  });

  socket.on('message', async (data) => {
    console.log('Message received:', data);
    io.emit('newMessage', data);
    // const message = await prisma.message.create({
    //   data: {
    //     content,
    //     sender: { connect: { id: senderId } },
    //     chat: { connect: { id: chatId } },
    //   },
    // });

  });

  socket.on('disconnect', (reason) => {
    const userId = socket.handshake.query.userId;
    console.log(new Date(), 'User diconnected id:', userId, reason);
  });
});

server.listen(PORT, () => {
  console.info(new Date(), `Server is running on http://localhost:${PORT}`);
});