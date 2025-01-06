import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LocationState {
  booking: {
    providerId: number;
    date: Date;
    time: string;
    providerName: string;
    hourlyRate: number;
  };
}

const PaymentPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Type assertion for location.state
  const bookingData = (location.state as LocationState)?.booking;

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-20 pb-12">
          <div className="max-w-3xl mx-auto px-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-600">
                  No booking information found. Please start a new booking.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Create the booking in the database
      const { data, error } = await supabase
        .from('service_bookings')
        .insert([
          {
            provider_id: bookingData.providerId,
            service_date: bookingData.date.toISOString().split('T')[0],
            service_time: bookingData.time,
            comments: comments.trim() || null,
            street_address: "123 Test Street", // This should come from user input or profile
            city: "Geneva",
            postal_code: "1201",
            address: "123 Test Street, Geneva, 1201"
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Booking Confirmed!",
        description: "Your service has been booked successfully.",
      });

      // Redirect to home page or booking confirmation page
      navigate('/');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Provider</span>
                  <span className="font-medium">{bookingData.providerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{bookingData.date.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate</span>
                  <span className="font-medium">CHF {bookingData.hourlyRate}/hour</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">CHF {bookingData.hourlyRate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any special instructions or comments for the service provider (optional)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-primary text-white px-4 py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Confirm and Pay"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;