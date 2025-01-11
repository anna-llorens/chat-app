

import { io, Socket } from 'socket.io-client';
const API_URL = import.meta.env.VITE_API_URL;

export let socket: Socket | null = null;

export const connectSocket = (userId: string): Socket => {
  if (!socket) {
    socket = io(API_URL, {
      reconnection: true,
      query: { userId },
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

