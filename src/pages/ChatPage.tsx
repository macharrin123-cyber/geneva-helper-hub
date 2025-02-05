import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

interface Provider {
  id: string;
  name: string;
  image_url: string;
  last_message?: string;
  last_message_time?: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Temporary mock user for testing
  const mockUser = {
    id: "test-user-id",
    email: "test@helpify.ch"
  };

  useEffect(() => {
    // Mock providers data
    const mockProviders: Provider[] = [
      {
        id: "provider-1",
        name: "John Smith",
        image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        last_message: "Could you describe the issue in more detail?",
        last_message_time: "10:45 PM"
      },
      {
        id: "provider-2",
        name: "Sarah Wilson",
        image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        last_message: "I'll be there tomorrow at 2 PM",
        last_message_time: "Yesterday"
      },
    ];
    setProviders(mockProviders);
    setSelectedProvider(mockProviders[0]);
  }, []);

  useEffect(() => {
    if (selectedProvider) {
      fetchMessages(mockUser.id);
    }
  }, [selectedProvider]);

  const fetchMessages = async (userId: string) => {
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-4 h-[calc(100vh-8rem)]">
            {/* Providers List Sidebar */}
            <Card className="col-span-3 p-4">
              <div className="mb-4">
                <div className="relative">
                  <Input 
                    placeholder="Search providers..." 
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-2">
                  {providers.map((provider) => (
                    <div
                      key={provider.id}
                      className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                        selectedProvider?.id === provider.id ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => setSelectedProvider(provider)}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={provider.image_url}
                          alt={provider.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {provider.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {provider.last_message}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {provider.last_message_time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Chat Area */}
            <Card className="col-span-9 flex flex-col">
              {selectedProvider ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b flex items-center space-x-3">
                    <img
                      src={selectedProvider.image_url}
                      alt={selectedProvider.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <h2 className="font-semibold">{selectedProvider.name}</h2>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender_id === mockUser.id
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg max-w-[80%] ${
                              message.sender_id === mockUser.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100'
                            }`}
                          >
                            <p>{message.content}</p>
                            <span className="text-xs opacity-70">
                              {new Date(message.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t flex items-end space-x-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 min-h-[2.5rem] max-h-32"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={sendMessage}
                      className="h-10 w-10 p-2"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a provider to start chatting
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;