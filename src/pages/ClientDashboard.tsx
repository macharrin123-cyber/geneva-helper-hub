import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type ServiceBooking = Tables<"service_bookings">;

const ClientDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      fetchBookings();
    };

    checkAuth();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { data: bookingsData, error: bookingsError } = await supabase
        .from('service_bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('service_date', { ascending: true });

      if (bookingsError) throw bookingsError;

      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'denied':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
          
          {loading ? (
            <p className="text-center text-gray-600">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">You haven't made any bookings yet</p>
              <button
                onClick={() => navigate('/')}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Browse Services
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <CardTitle>Booking on {new Date(booking.service_date).toLocaleDateString()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Time</p>
                          <p className="font-medium">{booking.service_time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">{booking.address}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Provider Response</p>
                          <p className={`font-medium capitalize ${getStatusColor(booking.provider_response)}`}>
                            {booking.provider_response}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Payment Status</p>
                          <p className="font-medium capitalize">{booking.payment_status}</p>
                        </div>
                        {booking.comments && (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-600">Your Comments</p>
                            <p className="font-medium">{booking.comments}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;