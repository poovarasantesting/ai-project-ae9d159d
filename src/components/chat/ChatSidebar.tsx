import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MessageCircle } from "lucide-react";
import { MessageType } from "@/types/chat";

interface ChatSidebarProps {
  chats: Record<string, MessageType[]>;
  activeChat: string | null;
  setActiveChat: (chatId: string) => void;
  createNewChat: () => void;
}

export default function ChatSidebar({ 
  chats, 
  activeChat, 
  setActiveChat,
  createNewChat
}: ChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredChats = Object.entries(chats)
    .filter(([_, messages]) => {
      if (!searchTerm) return true;
      
      const contactName = messages[0]?.sender;
      return contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        messages.some(msg => 
          msg.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          className="w-full mt-4 gap-2" 
          onClick={createNewChat}
        >
          <Plus size={16} />
          New Chat
        </Button>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {filteredChats.length > 0 ? (
          filteredChats.map(([chatId, messages]) => (
            <div
              key={chatId}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                activeChat === chatId ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
              }`}
              onClick={() => setActiveChat(chatId)}
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                {messages[0]?.sender?.charAt(0) || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">
                  {chatId === "chat1" ? "John" : 
                   chatId === "chat2" ? "Sarah" : 
                   `Contact ${chatId.replace("chat", "")}`}
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {messages[messages.length - 1]?.text || "No messages yet"}
                </p>
              </div>
              <div className="text-xs text-gray-400">
                {messages.length > 0 && new Date(messages[messages.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p>No chats found</p>
          </div>
        )}
      </div>
    </div>
  );
}