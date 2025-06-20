export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot" | "system";
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  messages: ChatMessage[];
}