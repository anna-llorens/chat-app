import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import userRoutes from './routes/user-routes.js';
import cors from "cors";
import { setupSocketHandlers } from './socket/events.js';
import { markNotificationAsRead } from './controllers/chat-controller.js';


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.put('/notifications/mark-read', markNotificationAsRead);

app.get('/', (_req, res) => {
  res.send("Server is running");
});

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on('connection', (socket) => {
  setupSocketHandlers(io, socket);
});

server.listen(PORT, () => {
  console.info(new Date(), `Server is running on http://localhost:${PORT}`);
});