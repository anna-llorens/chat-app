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
    // Fetch the latest 10 chats for the user
    const recentChats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10,
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
      },
    });

    // Transform the data to include only the required fields
    const formattedChats = recentChats.map(chat => {
      const receiver = chat.users.find(user => user.userId !== userId)?.user;
      const lastMessage = chat.messages[0];
      return {
        user: receiver,
        lastMessage: lastMessage?.content,
        createdAt: lastMessage?.createdAt,
        chatId: chat.id,
      };
    });

    return formattedChats;
  } catch (error) {
    console.error('Error fetching recent chats:', error);
    throw new Error('Unable to fetch recent chats');
  }
};