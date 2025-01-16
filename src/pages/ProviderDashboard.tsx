import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ServiceBooking, ServiceProvider } from "@/integrations/supabase/types";
import BookingCard from "@/components/dashboard/BookingCard";
import BookingStats from "@/components/dashboard/BookingStats";
import BookingTrends from "@/components/dashboard/BookingTrends";
import AvailabilityCalendar from "@/components/dashboard/AvailabilityCalendar";
import ProfileEditor from "@/components/dashboard/ProfileEditor";

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProviderData();
  }, [navigate]);

  const fetchProviderData = async () => {
    try {
      console.log('Fetching provider data...');
      const { data: providerData, error: providerError } = await supabase
        .from('service_providers')
        .select('*')
        .single();

      if (providerError) {
        console.error('Error fetching provider:', providerError);
        throw providerError;
      }

      console.log('Provider data:', providerData);
      setProvider(providerData);
      
      console.log('Fetching bookings...');
      const { data, error } = await supabase
        .from('service_bookings')
        .select('*')
        .eq('provider_id', providerData.id)
        .order('service_date', { ascending: true });

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }

      console.log('Bookings fetched:', data);
      setBookings(data || []);
    } catch (error) {
      console.error('Error in fetchBookings:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (bookingId: string, response: 'approved' | 'denied') => {
    try {
      console.log(`Updating booking ${bookingId} with response: ${response}`);
      const { error } = await supabase
        .from('service_bookings')
        .update({ provider_response: response })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking ${response} successfully`,
      });

      fetchProviderData();
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
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Provider Dashboard</h1>
          
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {provider && <ProfileEditor providerId={provider.id} />}
                {provider && <AvailabilityCalendar providerId={provider.id} />}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <BookingStats bookings={bookings} />
                <BookingTrends bookings={bookings} />
              </div>

              <div className="grid gap-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
                {bookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking}
                    onResponse={handleResponse}
                  />
                ))}

                {bookings.length === 0 && (
                  <Card>
                    <CardContent className="py-8">
                      <p className="text-center text-gray-500">No booking requests yet</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;