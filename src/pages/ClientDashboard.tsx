import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import ProfileSection from "@/components/dashboard/client/ProfileSection";
import BookingsList from "@/components/dashboard/client/BookingsList";

interface ProfileData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  imageUrl: string;
}

const ClientDashboard = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "Rukshan",
    lastName: "Srivarathan",
    email: "rukers75@gmail.com",
    phone: "7776924149",
    address: "38 Coleridge Road, Romford, RM3 7BB",
    emailNotifications: true,
    pushNotifications: false,
    imageUrl: ""
  });

  const mockBookings = [
    {
      id: '1',
      user_id: '1',
      provider_id: '1',
      service_date: '2024-03-20',
      service_time: '14:00',
      street_address: '123 Main St',
      city: 'San Francisco',
      postal_code: '94105',
      comments: 'Please bring eco-friendly cleaning supplies',
      status: 'completed',
      created_at: '2024-03-15',
      provider_response: 'approved',
      payment_status: 'completed',
      payment_intent_id: null,
      address: '123 Main St, San Francisco',
      provider: {
        id: '1',
        user_id: '2',
        image_url: '/placeholder.svg',
        hourly_rate: 45,
        service_type: 'Cleaning',
        created_at: '2024-01-01',
        description: 'Professional cleaning service',
        name: 'John Doe',
        phone: null,
        experience: null,
        email: null,
        cv_url: null,
        linkedin_profile: null
      }
    },
    {
      id: '2',
      user_id: '1',
      provider_id: '2',
      service_date: '2024-03-22',
      service_time: '10:00',
      street_address: '456 Market St',
      city: 'San Francisco',
      postal_code: '94105',
      status: 'completed',
      created_at: '2024-03-14',
      provider_response: 'approved',
      payment_status: 'completed',
      payment_intent_id: null,
      address: '456 Market St, San Francisco',
      comments: null,
      provider: {
        id: '2',
        user_id: '3',
        image_url: '/placeholder.svg',
        hourly_rate: 60,
        service_type: 'Plumbing',
        created_at: '2024-01-01',
        description: 'Expert plumbing services',
        name: 'Jane Smith',
        phone: null,
        experience: null,
        email: null,
        cv_url: null,
        linkedin_profile: null
      }
    }
  ];

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profile) {
          setProfileData(prev => ({
            ...prev,
            id: profile.id,
            imageUrl: profile.image_url || ''
          }));
        }

        const { count } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact' })
          .eq('receiver_id', user.id)
          .eq('is_read', false);
        
        setUnreadMessages(count || 0);
      }
    };
    getUser();

    const channel = supabase
      .channel('chat-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `receiver_id=eq.${user?.id}`
        },
        (payload) => {
          console.log('New message received:', payload);
          setUnreadMessages(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/lovable-uploads/e20a7267-cc03-45b8-a841-007d68e9aa3e.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 65%',
          backgroundAttachment: 'fixed',
          opacity: '0.5'
        }}
      />
      <div className="relative z-10">
        <Navigation />
        <main className="pt-16 md:pt-20 pb-8 md:pb-12 animate-fadeIn">
          {error && (
            <Alert variant="destructive" className="mb-4 md:mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="fixed right-8 bottom-8 z-50">
            <Button
              variant="default"
              size="icon"
              className="h-16 w-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 hover:scale-105 transform"
              onClick={() => navigate('/chat')}
            >
              <MessageSquare className="h-8 w-8 text-white" />
              {unreadMessages > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-7 w-7 flex items-center justify-center rounded-full text-sm font-bold animate-pulse"
                >
                  {unreadMessages}
                </Badge>
              )}
              <span className="sr-only">Open chat</span>
            </Button>
          </div>

          <div className="container mx-auto px-4">
            <ProfileSection profileData={profileData} setProfileData={setProfileData} />
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center md:text-left">
              My Bookings
            </h1>
            
            <BookingsList bookings={mockBookings} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;