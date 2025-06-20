import { X, Users, MessageSquare, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const recentContacts = [
  { id: 1, name: "Sarah Johnson", status: "online" },
  { id: 2, name: "Mike Peterson", status: "offline" },
  { id: 3, name: "Emma Williams", status: "online" },
  { id: 4, name: "David Chen", status: "offline" },
  { id: 5, name: "Lisa Moore", status: "online" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "md:translate-x-0 md:static md:z-0"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Contacts</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X size={20} />
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
              <Users size={16} />
              Recent Contacts
            </h3>
            <div className="space-y-1">
              {recentContacts.map((contact) => (
                <button 
                  key={contact.id}
                  className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-slate-100 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10">
                      {contact.name.charAt(0)}
                    </AvatarFallback>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} />
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{contact.name}</span>
                    <span className={cn(
                      "text-xs",
                      contact.status === "online" ? "text-green-500" : "text-gray-400"
                    )}>
                      {contact.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare size={16} className="mr-2" />
            All Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}