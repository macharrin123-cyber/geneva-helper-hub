import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Check, X } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ServiceProvider } from "@/integrations/supabase/types";

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkAuth();
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const { data: providerData, error: providerError } = await supabase
        .from('service_providers')
        .select('*')
        .single();

      if (providerError) throw providerError;

      const { data, error } = await supabase
        .from('service_bookings')
        .select('*')
        .eq('provider_id', providerData.id)
        .order('service_date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (bookingId: string, response: 'approved' | 'denied') => {
    try {
      const { error } = await supabase
        .from('service_bookings')
        .update({ provider_response: response })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking ${response} successfully`,
      });

      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive",
      });
    }
  };

  // Prepare data for the pie chart
  const statusCounts = bookings.reduce((acc: Record<string, number>, booking) => {
    const status = booking.provider_response || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = {
    approved: '#10B981',
    denied: '#EF4444',
    pending: '#F59E0B'
  };

  // Prepare data for the bar chart
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Provider Dashboard</h1>
          
          {loading ? (
            <p>Loading bookings...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              </div>

              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <CardTitle>Booking Request - {new Date(booking.service_date).toLocaleDateString()}</CardTitle>
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
                              onClick={() => handleResponse(booking.id, 'approved')}
                              className="flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleResponse(booking.id, 'denied')}
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