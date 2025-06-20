import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageType } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWindowProps {
  messages: MessageType[];
  sendMessage: (text: string) => void;
  activeChatName: string | null;
}

export default function ChatWindow({ 
  messages, 
  sendMessage,
  activeChatName
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {!activeChatName ? (
        <div className="flex-1 flex items-center justify-center flex-col p-8 text-center">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
            <Send size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Select a chat or start a new conversation</h3>
          <p className="text-gray-500 max-w-md">
            Choose an existing conversation from the sidebar or create a new chat to start messaging.
          </p>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-gray-200 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              {activeChatName?.charAt(0) || "?"}
            </div>
            <div>
              <h3 className="font-medium">{activeChatName}</h3>
              <div className="text-xs text-green-500">Online</div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.isOwn ? "flex-row-reverse" : ""}`}>
                  <Avatar className={message.isOwn ? "bg-blue-500" : "bg-gray-200"}>
                    <AvatarFallback className={message.isOwn ? "text-white" : "text-gray-700"}>
                      {message.sender.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className={`rounded-lg p-3 ${
                      message.isOwn 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {message.text}
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.isOwn ? "text-right" : ""
                    } text-gray-500`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </ScrollArea>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send size={18} />
            </Button>
          </form>
        </>
      )}
    </div>
  );
}