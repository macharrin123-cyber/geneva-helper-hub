import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ServiceBookingWithProvider, Profile } from "@/integrations/supabase/types";
import { MapPin, Calendar, Clock, DollarSign } from "lucide-react";

const ClientDashboard = () => {
  const [error] = useState<string | null>(null);
  
  // Mock data for development
  const mockProfile: Profile = {
    id: '1',
    user_type: 'client',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  };

  const mockBookings: ServiceBookingWithProvider[] = [
    {
      id: '1',
      user_id: '1',
      provider_id: '1',
      service_date: '2024-03-20',
      service_time: '14:00',
      street_address: '123 Main St',
      city: 'San Francisco',
      postal_code: '94105',
      comments: 'Please bring eco-friendly cleaning supplies',
      status: 'pending',
      created_at: '2024-03-15',
      provider_response: 'pending',
      payment_status: 'pending',
      payment_intent_id: null,
      address: '123 Main St, San Francisco',
      provider: {
        id: '1',
        user_id: '2',
        image_url: '/placeholder.svg',
        hourly_rate: 45,
        service_type: 'Cleaning',
        created_at: '2024-01-01',
        description: 'Professional cleaning service',
        name: 'John Doe'  // Added name property
      }
    },
    {
      id: '2',
      user_id: '1',
      provider_id: '2',
      service_date: '2024-03-22',
      service_time: '10:00',
      street_address: '456 Market St',
      city: 'San Francisco',
      postal_code: '94105',
      status: 'completed',
      created_at: '2024-03-14',
      provider_response: 'approved',
      payment_status: 'completed',
      payment_intent_id: null,
      address: '456 Market St, San Francisco',
      comments: null,
      provider: {
        id: '2',
        user_id: '3',
        image_url: '/placeholder.svg',
        hourly_rate: 60,
        service_type: 'Plumbing',
        created_at: '2024-01-01',
        description: 'Expert plumbing services',
        name: 'Jane Smith'  // Added name property
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <main className="pt-20 pb-12 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {mockProfile && (
            <Card className="mb-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Account Type: {mockProfile.user_type}</p>
                  <p className="text-sm text-gray-600">Member since: {new Date(mockProfile.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
          
          <div className="grid gap-6">
            {mockBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">{booking.provider.service_type} Service</span>
                    <span className={`ml-auto text-sm px-3 py-1 rounded-full ${
                      booking.provider_response === 'approved' ? 'bg-green-100 text-green-800' : 
                      booking.provider_response === 'denied' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.provider_response.charAt(0).toUpperCase() + booking.provider_response.slice(1)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">{new Date(booking.service_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-5 h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">{booking.service_time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Rate</p>
                          <p className="font-medium">CHF {booking.provider.hourly_rate}/hour</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{booking.city}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Full Address</p>
                        <p className="font-medium">{booking.street_address}, {booking.postal_code}</p>
                      </div>
                    </div>

                    {booking.comments && (
                      <div>
                        <p className="text-sm text-gray-500">Comments</p>
                        <p className="font-medium">{booking.comments}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm ${
                        booking.provider_response === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : booking.provider_response === 'denied'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        Provider Status: {booking.provider_response}
                      </div>

                      <div className={`inline-flex px-3 py-1 rounded-full text-sm ${
                        booking.payment_status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        Payment: {booking.payment_status}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {mockBookings.length === 0 && (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-gray-500">No bookings yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;