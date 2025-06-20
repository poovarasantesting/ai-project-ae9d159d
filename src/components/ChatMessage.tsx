import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";
  
  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%] rounded-lg p-3",
        isUser ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
      )}
    >
      <p className="text-sm">{message.text}</p>
      <span className={cn(
        "text-xs mt-1",
        isUser ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        {format(message.timestamp, "HH:mm")}
      </span>
    </div>
  );
}