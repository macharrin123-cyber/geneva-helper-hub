import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingSummaryProps {
  bookingData: {
    providerName: string;
    date: Date;
    time: string;
    hourlyRate: number;
  };
}

const BookingSummary = ({ bookingData }: BookingSummaryProps) => {
  return (
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
  );
};

export default BookingSummary;