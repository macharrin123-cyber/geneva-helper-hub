import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BookingSummary from "@/components/payment/BookingSummary";
import CommentsSection from "@/components/payment/CommentsSection";
import PaymentSection from "@/components/payment/PaymentSection";

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
  
  const bookingData = (location.state as LocationState)?.booking;

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-20 pb-12">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-center text-gray-600">
              No booking information found. Please start a new booking.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const handlePaymentSuccess = async () => {
    try {
      const { error } = await supabase
        .from('service_bookings')
        .insert([
          {
            provider_id: bookingData.providerId,
            service_date: bookingData.date.toISOString().split('T')[0],
            service_time: bookingData.time,
            comments: comments.trim() || null,
            street_address: "123 Test Street",
            city: "Geneva",
            postal_code: "1201",
            address: "123 Test Street, Geneva, 1201",
            payment_status: "completed"
          }
        ]);

      if (error) throw error;

      toast({
        title: "Booking Confirmed!",
        description: "Your service has been booked successfully.",
      });

      navigate('/');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>
          
          <BookingSummary bookingData={bookingData} />
          <CommentsSection comments={comments} onChange={setComments} />
          <PaymentSection amount={bookingData.hourlyRate} onSuccess={handlePaymentSuccess} />
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;