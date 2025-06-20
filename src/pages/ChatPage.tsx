import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import { ChatMessage, Conversation } from "../types/chat";

const initialConversations: Conversation[] = [
  {
    id: "1",
    name: "General Chat",
    messages: [
      {
        id: "msg1",
        text: "Welcome to the chat app!",
        sender: "system",
        timestamp: new Date().toISOString(),
      },
    ],
  },
];

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>(initialConversations[0].id);

  const activeConversation = conversations.find((conv) => conv.id === activeConversationId) || conversations[0];

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: uuidv4(),
      name: `New Chat ${conversations.length + 1}`,
      messages: [],
    };
    
    setConversations([...conversations, newConversation]);
    setActiveConversationId(newConversation.id);
    toast.success("New conversation created");
  };

  const renameConversation = (id: string, newName: string) => {
    setConversations(
      conversations.map((conv) =>
        conv.id === id ? { ...conv, name: newName } : conv
      )
    );
    toast.success("Conversation renamed");
  };

  const deleteConversation = (id: string) => {
    const filteredConversations = conversations.filter((conv) => conv.id !== id);
    setConversations(filteredConversations);
    
    if (id === activeConversationId && filteredConversations.length > 0) {
      setActiveConversationId(filteredConversations[0].id);
    }
    
    toast.success("Conversation deleted");
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const newMessage: ChatMessage = {
      id: uuidv4(),
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    
    const botReply: ChatMessage = {
      id: uuidv4(),
      text: `Reply to: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
      sender: "bot",
      timestamp: new Date(Date.now() + 1000).toISOString(),
    };
    
    setConversations(
      conversations.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage, botReply],
            }
          : conv
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewConversation={createNewConversation}
        onRenameConversation={renameConversation}
        onDeleteConversation={deleteConversation}
      />
      <ChatWindow
        conversation={activeConversation}
        onSendMessage={sendMessage}
      />
    </div>
  );
}