import { ServiceBooking } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface BookingTrendsProps {
  bookings: ServiceBooking[];
}

const BookingTrends = ({ bookings }: BookingTrendsProps) => {
  const monthlyBookings = bookings.reduce((acc: Record<string, number>, booking) => {
    const month = new Date(booking.service_date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.entries(monthlyBookings).map(([month, count]) => ({
    month,
    bookings: count
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Booking Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#1E3A8A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingTrends;