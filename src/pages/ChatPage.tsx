import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Temporary mock user for testing
  const mockUser = {
    id: "test-user-id",
    email: "test@helpify.ch"
  };

  useEffect(() => {
    // Temporarily disabled authentication check
    fetchMessages(mockUser.id);
  }, []);

  const fetchMessages = async (userId: string) => {
    // For testing, let's add some mock messages
    const mockMessages: Message[] = [
      {
        id: "1",
        content: "Hello! How can I help you today?",
        sender_id: "provider-1",
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "2",
        content: "I need help with my plumbing issue",
        sender_id: mockUser.id,
        created_at: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: "3",
        content: "Could you describe the issue in more detail?",
        sender_id: "provider-1",
        created_at: new Date(Date.now() - 900000).toISOString(),
      }
    ];
    
    setMessages(mockMessages);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const mockNewMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender_id: mockUser.id,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, mockNewMessage]);
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-6">Messages</h1>
            
            <ScrollArea className="h-[400px] mb-4 p-4 rounded-lg border">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.sender_id === mockUser.id
                        ? "ml-auto bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-70">
                      {new Date(message.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;