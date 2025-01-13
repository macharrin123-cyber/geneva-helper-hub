import { ServiceBooking } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface BookingCardProps {
  booking: ServiceBooking;
  onResponse: (bookingId: string, response: 'approved' | 'denied') => void;
}

const BookingCard = ({ booking, onResponse }: BookingCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking - {new Date(booking.service_date).toLocaleDateString()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{booking.service_time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{booking.street_address}, {booking.city}</p>
            </div>
          </div>
          
          {booking.comments && (
            <div>
              <p className="text-sm text-gray-500">Comments</p>
              <p className="font-medium">{booking.comments}</p>
            </div>
          )}

          {booking.provider_response === 'pending' && (
            <div className="flex gap-4">
              <Button
                onClick={() => onResponse(booking.id, 'approved')}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => onResponse(booking.id, 'denied')}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Deny
              </Button>
            </div>
          )}

          {booking.provider_response !== 'pending' && (
            <div className={`inline-flex px-3 py-1 rounded-full text-sm ${
              booking.provider_response === 'approved' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              Status: {booking.provider_response}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;