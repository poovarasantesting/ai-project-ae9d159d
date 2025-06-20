import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { MessageType } from "@/types/chat";

export default function ChatPage() {
  const { toast } = useToast();
  const [activeChat, setActiveChat] = useState<string | null>("chat1");
  const [chats, setChats] = useState<Record<string, MessageType[]>>({
    chat1: [
      { id: "1", sender: "John", text: "Hey, how are you?", timestamp: new Date().toISOString(), isOwn: false },
      { id: "2", sender: "You", text: "I'm good! How about you?", timestamp: new Date().toISOString(), isOwn: true },
    ],
    chat2: [
      { id: "1", sender: "Sarah", text: "Did you finish the project?", timestamp: new Date().toISOString(), isOwn: false },
      { id: "2", sender: "You", text: "Still working on it!", timestamp: new Date().toISOString(), isOwn: true },
    ],
  });

  const sendMessage = (text: string) => {
    if (!activeChat) return;
    
    const newMessage: MessageType = {
      id: Date.now().toString(),
      sender: "You",
      text,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };

    setChats(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }));

    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });

    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        sender: activeChat === "chat1" ? "John" : "Sarah",
        text: `Thanks for your message: "${text}"`,
        timestamp: new Date().toISOString(),
        isOwn: false,
      };

      setChats(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), responseMessage],
      }));
    }, 1000);
  };

  const createNewChat = () => {
    const newChatId = `chat${Object.keys(chats).length + 1}`;
    const contactName = `Contact ${Object.keys(chats).length + 1}`;
    
    setChats(prev => ({
      ...prev,
      [newChatId]: [{
        id: "1",
        sender: contactName,
        text: `Hi! This is ${contactName}. How can I help you?`,
        timestamp: new Date().toISOString(),
        isOwn: false,
      }],
    }));
    
    setActiveChat(newChatId);
    
    toast({
      title: "New chat created",
      description: `Started conversation with ${contactName}`,
    });
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <ChatSidebar 
        chats={chats} 
        activeChat={activeChat} 
        setActiveChat={setActiveChat} 
        createNewChat={createNewChat}
      />
      <ChatWindow 
        messages={activeChat ? chats[activeChat] || [] : []} 
        sendMessage={sendMessage}
        activeChatName={activeChat ? 
          (activeChat === "chat1" ? "John" : activeChat === "chat2" ? "Sarah" : `Contact ${activeChat.replace("chat", "")}`) 
          : null}
      />
    </div>
  );
}