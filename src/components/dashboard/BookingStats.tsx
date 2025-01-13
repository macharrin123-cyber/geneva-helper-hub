import { ServiceBooking } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface BookingStatsProps {
  bookings: ServiceBooking[];
}

const COLORS = {
  approved: '#10B981',
  denied: '#EF4444',
  pending: '#F59E0B'
};

const BookingStats = ({ bookings }: BookingStatsProps) => {
  const statusCounts = bookings.reduce((acc: Record<string, number>, booking) => {
    const status = booking.provider_response || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingStats;