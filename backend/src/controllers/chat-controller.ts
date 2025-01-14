import { Request, Response } from 'express';
import { getRecentChats, notificationReadService } from "../services/chat-service.js";


export const recentChats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const chats = await getRecentChats(id);
    res.status(200).json(chats);
  } catch (error: any) {
    console.error(new Date(), "Error fetching recent chats", error);
    res.status(500).json({ message: "Failed to fetch recent chats" });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  const { userId, chatId } = req.body;
  if (!userId || !chatId) {
    res.status(400).json({ error: 'Missing userId or chatId in request body.' });
  }
  try {
    const message = await notificationReadService(userId, chatId);
    res.status(200).json({ message });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to mark notification as read.' });
  }
};