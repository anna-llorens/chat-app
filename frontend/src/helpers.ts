import SHA256 from "crypto-js/sha256";

export const generateChatId = (userId1?: string, userId2?: string) => {
  const sortedIds = [userId1, userId2].sort().join("_");
  const hash = SHA256(sortedIds).toString();
  return hash.substring(0, 24);
}

export const formatMessageDate = (date: Date, isChatArea = false): string => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const isCurrentYear = date.getFullYear() === today.getFullYear();

  if (date.toDateString() === today.toDateString()) {
    return isChatArea ? "Today" :
      date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true })
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  if (date > oneWeekAgo) {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    ...(isCurrentYear ? {} : { year: "numeric" }),
  });
};


