import { useState } from "react";
import { PlusCircle, MessageSquare, Settings, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Conversation } from "../../types/chat";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onRenameConversation: (id: string, newName: string) => void;
  onDeleteConversation: (id: string) => void;
}

export default function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onRenameConversation,
  onDeleteConversation,
}: ChatSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const startEditing = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditName(conversation.name);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      onRenameConversation(editingId, editName);
      setEditingId(null);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Chat App</h1>
      </div>
      
      <div className="p-3">
        <Button 
          variant="outline" 
          className="w-full justify-start text-white" 
          onClick={onNewConversation}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`px-3 py-2 mb-1 flex items-center hover:bg-gray-700 rounded-md cursor-pointer ${
              conversation.id === activeConversationId ? "bg-gray-700" : ""
            }`}
          >
            {editingId === conversation.id ? (
              <div className="flex items-center w-full gap-1">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-7 text-sm bg-gray-900"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                />
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-7 px-2" 
                  onClick={saveEdit}
                >
                  Save
                </Button>
              </div>
            ) : (
              <>
                <div
                  className="flex-1 truncate"
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <MessageSquare className="mr-2 h-4 w-4 inline-block" />
                  {conversation.name}
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => startEditing(conversation)}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onDeleteConversation(conversation.id)}
                  >
                    <LogOut className="h-3 w-3" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
            U
          </div>
          <div>
            <div className="font-medium">User</div>
            <div className="text-xs text-gray-400">Free Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
}