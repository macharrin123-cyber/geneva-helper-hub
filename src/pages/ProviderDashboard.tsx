import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type ServiceBooking = Tables<"service_bookings">;

const ProviderDashboard = () => {
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
      const { data: providerData, error: providerError } = await supabase
        .from('service_providers')
        .select('id')
        .single();

      if (providerError) throw providerError;

      const { data: bookingsData, error: bookingsError } = await supabase
        .from('service_bookings')
        .select('*')
        .eq('provider_id', providerData.id)
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

  const handleResponse = async (bookingId: string, response: 'approved' | 'denied') => {
    try {
      const { error } = await supabase
        .from('service_bookings')
        .update({ provider_response: response })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, provider_response: response }
          : booking
      ));

      toast({
        title: "Success",
        description: `Booking ${response}`,
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Provider Dashboard</h1>
          
          {loading ? (
            <p className="text-center text-gray-600">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-center text-gray-600">No bookings found</p>
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
                          <p className="text-sm text-gray-600">Status</p>
                          <p className="font-medium capitalize">{booking.provider_response}</p>
                        </div>
                        {booking.comments && (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-600">Comments</p>
                            <p className="font-medium">{booking.comments}</p>
                          </div>
                        )}
                      </div>
                      
                      {booking.provider_response === 'pending' && (
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleResponse(booking.id, 'approved')}
                            className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleResponse(booking.id, 'denied')}
                            className="flex-1 bg-destructive text-white px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors"
                          >
                            Deny
                          </button>
                        </div>
                      )}
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

export default ProviderDashboard;