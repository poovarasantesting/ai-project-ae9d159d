import { useState, useRef, useEffect } from "react";
import { Send, User, UserCircle2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ChatMessage from "@/components/ChatMessage";
import Sidebar from "@/components/Sidebar";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  avatar?: string;
  username: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to the chat! How can I help you today?",
      sender: "other",
      timestamp: new Date(),
      username: "ChatBot"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock usernames for simulating responses
  const botNames = ["ChatBot", "Assistant", "Helper", "Guide"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      username: "You"
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate response after a short delay
    setTimeout(() => {
      const botName = botNames[Math.floor(Math.random() * botNames.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thanks for your message! This is a simulated response to: "${newMessage}"`,
        sender: "other",
        timestamp: new Date(),
        username: botName
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      toast({
        title: "New message",
        description: `${botName} has replied to your message`,
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)} 
              className="mr-2 md:hidden"
            >
              <Menu />
            </Button>
            <h1 className="text-xl font-bold">Chat Application</h1>
          </div>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback><User size={24} /></AvatarFallback>
              <AvatarImage src="/avatar.png" />
            </Avatar>
            <span className="hidden md:inline font-medium">Your Name</span>
          </div>
        </header>
        
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              autoFocus
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send size={18} className="mr-2" />
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}