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
import { LayoutDashboard, Loader2 } from "lucide-react";

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
      // Convert the data to match ServiceBooking type
      const typedBookings: ServiceBooking[] = data.map(booking => ({
        ...booking,
        provider_id: booking.provider_id.toString() // Convert number to string
      }));
      setBookings(typedBookings);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="flex items-center gap-2 text-primary">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading dashboard...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {provider && (
                  <div className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                    <ProfileEditor providerId={provider.id} />
                  </div>
                )}
                {provider && (
                  <div className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                    <AvailabilityCalendar providerId={provider.id} />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                  <BookingStats bookings={bookings} />
                </div>
                <div className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                  <BookingTrends bookings={bookings} />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  Recent Bookings
                </h2>
                <div className="grid gap-6">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                      <BookingCard 
                        booking={booking}
                        onResponse={handleResponse}
                      />
                    </div>
                  ))}

                  {bookings.length === 0 && (
                    <Card className="border border-gray-200 shadow-sm">
                      <CardContent className="py-8">
                        <p className="text-center text-gray-500">No booking requests yet</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;