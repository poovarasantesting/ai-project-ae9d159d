import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar } from "../ui/avatar";
import { Conversation, ChatMessage } from "../../types/chat";

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (text: string) => void;
}

export default function ChatWindow({ conversation, onSendMessage }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  function formatTimestamp(timestamp: string) {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-950">
      <div className="border-b p-4 dark:border-gray-800">
        <h2 className="font-semibold text-xl">{conversation.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {conversation.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t dark:border-gray-800">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[60px] flex-1"
            rows={1}
          />
          <Button type="submit" className="self-end" disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: ChatMessage }) {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} ${
        isSystem ? "justify-center" : ""
      }`}
    >
      {isSystem ? (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%] text-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">{message.text}</span>
        </div>
      ) : (
        <div
          className={`flex gap-3 max-w-[80%] ${
            isUser ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <Avatar className={`h-8 w-8 ${isUser ? "bg-blue-500" : "bg-green-500"}`}>
            <div className="text-xs font-medium text-white">
              {isUser ? "U" : "B"}
            </div>
          </Avatar>
          <div>
            <div
              className={`rounded-lg p-3 ${
                isUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              }`}
            >
              {message.text}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}