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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/signin");
        return;
      }
      setUser(user);
      fetchMessages(user.id);
    };

    checkUser();
  }, [navigate]);

  const fetchMessages = async (userId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const { error } = await supabase
      .from("chat_messages")
      .insert([
        {
          content: newMessage,
          sender_id: user.id,
        }
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setNewMessage("");
    fetchMessages(user.id);
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
                      message.sender_id === user?.id
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