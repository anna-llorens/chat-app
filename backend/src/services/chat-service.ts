import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Handles adding a message to the database.
 * @param data - The message data including content, senderId, chatId, and contactId.
 * @returns The saved message.
 */
export const addMessage = async (data: {
  content: string;
  senderId: string;
  chatId: string;
  contactId: string;
}) => {
  const { content, senderId, chatId, contactId } = data;
  try {
    // Check if the chat exists
    let chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });
    //  If chat doesn't exist, create it
    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          id: chatId,
          createdAt: new Date(),
          users: {
            create: [
              { user: { connect: { id: senderId } } },
              { user: { connect: { id: contactId } } },
            ],
          },
        },
      });
    }
    // Save the message in the database
    const message = await prisma.message.create({
      data: {
        content,
        sender: { connect: { id: senderId } },
        chat: { connect: { id: chatId } },
      },
    });

    await prisma.notification.upsert({
      where: {
        userId_chatId: {
          userId: contactId,
          chatId,
        },
      },
      update: {
        count: { increment: 1 },
        updatedAt: new Date(),
      },
      create: {
        userId: contactId,
        chatId,
        count: 1,
      },
    });

    return message;
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message.");
  }
}

/**
 * Fetches the chat history (messages) for a given chatId.
 * 
 * @param chatId - The ID of the chat whose history is to be fetched.
 * @returns An array of messages sorted by creation time.
 */
export async function getChatHistory(chatId: string) {
  try {
    const history = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
    });
    return history;
  } catch (error) {
    console.error(`Error retrieving chat history for chatId: ${chatId}`, error);
    throw new Error("Failed to retrieve chat history.");
  }
}

export const getRecentChats = async (userId: string) => {
  try {
    // Fetch chats for the user with necessary relations
    const recentChats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        users: {
          include: {
            user: true, // Include user details if needed
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1, // Include the latest message for each chat
        },
        notifications: {
          where: {
            userId
          }
        }
      },
    });

    // Transform the data to include only the required fields
    const formattedChats = recentChats.map(chat => {
      const receiver = chat.users.find(user => user.userId !== userId)?.user;
      const lastMessage = chat?.messages[0];
      const notification = chat?.notifications[0]; // There should only be one notification per user per chat

      return {
        user: receiver,
        lastMessage: lastMessage?.content,
        lastUpdated: lastMessage?.createdAt || chat.updatedAt, // Use the latest message date or chat updatedAt
        chatId: chat.id,
        notificationCount: notification?.count || 0, // Default to 0 if no notifications exist
      };
    });

    // Sort chats by the latest activity (lastUpdated field)
    formattedChats.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

    return formattedChats;
  } catch (error) {
    console.error('Error fetching recent chats:', error);
    throw new Error('Unable to fetch recent chats');
  }
};



export const notificationReadService = async (userId: string, chatId: string) => {
  try {
    await prisma.notification.updateMany({
      where: {
        userId,
        chatId,
      },
      data: {
        count: 0,
      },
    });
    return { success: true, message: "Notification marked as read." };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw new Error('Unable to mark notification as read.');
  }
};



