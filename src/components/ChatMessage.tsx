import { format } from "date-fns";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/pages/ChatPage";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";
  
  return (
    <div className={cn(
      "flex items-start gap-2 max-w-[80%]",
      isUser ? "ml-auto flex-row-reverse" : "mr-auto"
    )}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={isUser ? "bg-blue-500" : "bg-green-500"}>
          <User size={16} color="white" />
        </AvatarFallback>
        {message.avatar && <AvatarImage src={message.avatar} alt={message.username} />}
      </Avatar>
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{message.username}</span>
          <span className="text-xs text-muted-foreground">
            {format(message.timestamp, "HH:mm")}
          </span>
        </div>
        
        <div className={cn(
          "rounded-lg py-2 px-3",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-secondary text-secondary-foreground"
        )}>
          {message.text}
        </div>
      </div>
    </div>
  );
}