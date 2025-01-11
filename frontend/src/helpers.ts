import SHA256 from "crypto-js/sha256";

export const generateChatId = (userId1?: string, userId2?: string) => {
  const sortedIds = [userId1, userId2].sort().join("_");
  const hash = SHA256(sortedIds).toString();
  return hash.substring(0, 24);
}