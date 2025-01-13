import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { ServiceBookingWithProvider } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

const ClientDashboard = () => {
  const [bookings, setBookings] = useState<ServiceBookingWithProvider[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signin');
        return;
      }
      
      await Promise.all([
        fetchProfile(session.user.id),
        fetchBookings(session.user.id)
      ]);
      
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    }
  };

  const fetchBookings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('service_bookings')
        .select(`
          *,
          service_providers (*)
        `)
        .eq('user_id', userId)
        .order('service_date', { ascending: false });

      if (error) throw error;
      
      // Explicitly type the data as ServiceBookingWithProvider[]
      const typedData = data as unknown as ServiceBookingWithProvider[];
      setBookings(typedData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load booking data');
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {profile && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Account Type: {profile.user_type}</p>
                  <p className="text-sm text-gray-600">Member since: {new Date(profile.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
          
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle>
                    {booking.service_providers?.service_type} Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{new Date(booking.service_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{booking.service_time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rate</p>
                        <p className="font-medium">CHF {booking.service_providers?.hourly_rate}/hour</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{booking.city}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{booking.street_address}, {booking.postal_code}</p>
                    </div>

                    {booking.comments && (
                      <div>
                        <p className="text-sm text-gray-500">Comments</p>
                        <p className="font-medium">{booking.comments}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm ${getStatusBadgeStyle(booking.provider_response)}`}>
                        Provider Status: {booking.provider_response || 'Pending'}
                      </div>

                      <div className={`inline-flex px-3 py-1 rounded-full text-sm ${
                        booking.payment_status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        Payment: {booking.payment_status || 'Pending'}
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
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
