import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('id', bookingId)
          .single();

        if (error) throw error;
        setBookingDetails(data);
      } catch (error) {
        console.error('Error fetching booking:', error);
        toast({
          title: "Error",
          description: "Could not load booking details",
          variant: "destructive",
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      // Here we'll integrate with Stripe for payment processing
      // For now, we'll just show a success message
      toast({
        title: "Success",
        description: "Payment processed successfully!",
      });
      navigate('/');
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "Payment failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Payment</CardTitle>
            </CardHeader>
            <CardContent>
              {bookingDetails && (
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-medium">Booking Details</h3>
                    <p>Date: {new Date(bookingDetails.booking_date).toLocaleDateString()}</p>
                    <p>Time: {bookingDetails.booking_time}</p>
                    <p>Amount: CHF {bookingDetails.amount}</p>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Pay Now (CHF {bookingDetails.amount})
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;