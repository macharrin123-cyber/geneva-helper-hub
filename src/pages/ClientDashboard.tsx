import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const ClientDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkAuth();
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('service_bookings')
        .select(`
          *,
          service_providers (
            service_type,
            hourly_rate
          )
        `)
        .eq('user_id', session.user.id)
        .order('service_date', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
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

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
          
          {loading ? (
            <p>Loading bookings...</p>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <CardTitle>
                      {booking.service_providers.service_type} Service - {new Date(booking.service_date).toLocaleDateString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">{booking.service_time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rate</p>
                          <p className="font-medium">CHF {booking.service_providers.hourly_rate}/hour</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{booking.street_address}, {booking.city}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm ${getStatusBadgeStyle(booking.provider_response)}`}>
                          Status: {booking.provider_response}
                        </div>

                        <div className={`inline-flex px-3 py-1 rounded-full text-sm ${
                          booking.payment_status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          Payment: {booking.payment_status}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {bookings.length === 0 && (
                <Card>
                  <CardContent className="py-8">
                    <p className="text-center text-gray-500">No bookings yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;