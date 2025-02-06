import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceBooking, ServiceProvider, ChatMessage } from "@/integrations/supabase/types";
import { Search, Send, Mail, Phone, MapPin, Clock, Star } from "lucide-react";

type ServiceBooking = Tables<"service_bookings">["Row"];
type ServiceProvider = Tables<"service_providers">["Row"];
type ChatMessage = Tables<"chat_messages">["Row"];

const ChatPage = () => {
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  // Mock data for testing
  useEffect(() => {
    const mockProviders: ServiceProvider[] = [
      {
        id: "1",
        name: "John Doe",
        service_type: "Cleaning",
        image_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=1`,
        hourly_rate: 25,
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Jane Smith",
        service_type: "Plumbing",
        image_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=2`,
        hourly_rate: 35,
        created_at: new Date().toISOString(),
      },
    ] as ServiceProvider[];

    const mockBookings: ServiceBooking[] = [
      {
        id: "1",
        provider_id: 1,
        service_date: "2024-02-15",
        service_time: "14:00",
        status: "completed",
        address: "123 Main St",
        street_address: "123 Main St",
        city: "New York",
        postal_code: "10001",
        created_at: "2024-02-01",
      },
      {
        id: "2",
        provider_id: 2,
        service_date: "2024-02-20",
        service_time: "10:00",
        status: "pending",
        address: "456 Park Ave",
        street_address: "456 Park Ave",
        city: "New York",
        postal_code: "10002",
        created_at: "2024-02-05",
      },
    ] as ServiceBooking[];

    setProviders(mockProviders);
    setBookings(mockBookings);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedProvider) return;

    const message: ChatMessage = {
      id: Math.random().toString(),
      content: newMessage,
      sender_id: "current-user",
      receiver_id: selectedProvider.id,
      created_at: new Date().toISOString(),
      booking_id: null,
      is_read: false
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto pt-20 pb-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-12 h-[calc(100vh-12rem)]">
            {/* Sidebar */}
            <div className="col-span-3 border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search providers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(100%-4rem)]">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider)}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      selectedProvider?.id === provider.id ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={provider.image_url} alt={provider.name} />
                        <AvatarFallback>{provider.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <p className="text-sm text-gray-500">{provider.service_type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="col-span-9">
              {selectedProvider ? (
                <div className="h-full flex flex-col">
                  {/* Enhanced Provider Profile Section */}
                  <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
                    <div className="flex items-start space-x-6">
                      <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                        <AvatarImage src={selectedProvider.image_url} alt={selectedProvider.name} />
                        <AvatarFallback>{selectedProvider.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-gray-900">{selectedProvider.name}</h2>
                        <p className="text-gray-500 mt-1">{selectedProvider.service_type}</p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>{selectedProvider.email}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{selectedProvider.phone || 'Not provided'}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{selectedProvider.address || 'Location not specified'}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>${selectedProvider.hourly_rate}/hour</span>
                          </div>
                        </div>
                        {selectedProvider.description && (
                          <p className="mt-4 text-gray-600">{selectedProvider.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="chat" className="flex-1">
                    <TabsList className="w-full justify-start px-4 py-2 border-b">
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                      <TabsTrigger value="availability">Availability</TabsTrigger>
                      <TabsTrigger value="bookings">Bookings & Invoices</TabsTrigger>
                    </TabsList>

                    <TabsContent value="chat" className="flex-1 flex flex-col">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender_id === "current-user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender_id === "current-user"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100"
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t">
                        <div className="flex space-x-2">
                          <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1"
                          />
                          <Button onClick={handleSendMessage}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="availability" className="p-4">
                      <Card>
                        <CardContent className="pt-6">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="bookings" className="p-4 space-y-4">
                      {bookings.map((booking) => (
                        <Card key={booking.id}>
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium">Date:</span>
                                <span>{new Date(booking.service_date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Time:</span>
                                <span>{booking.service_time}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Status:</span>
                                <span className={`capitalize ${
                                  booking.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                                }`}>
                                  {booking.status}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Address:</span>
                                <span>{booking.address}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a provider to start chatting
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
