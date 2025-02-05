import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { ServiceBookingWithProvider, Profile } from "@/integrations/supabase/types";
import { MapPin, Calendar, Clock, DollarSign, ImageIcon, UserRound, Star } from "lucide-react";
import { useForm } from "react-hook-form";

interface ReviewFormData {
  rating: number;
  text: string;
}

const ClientDashboard = () => {
  const [error] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<ServiceBookingWithProvider | null>(null);
  
  const mockProfile: Profile = {
    id: '1',
    user_type: 'client',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("provider-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("provider-images")
        .getPublicUrl(filePath);

      // Here you would update the profile with the new image URL
      // For now we'll just show a success message
      toast({
        title: "Success",
        description: "Profile image updated successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleReviewSubmit = async (data: ReviewFormData) => {
    if (!selectedBooking) return;

    try {
      const { error: reviewError } = await supabase
        .from('reviews')
        .insert({
          booking_id: selectedBooking.id,
          user_id: mockProfile.id,
          rating: data.rating,
          text: data.text
        });

      if (reviewError) throw reviewError;

      toast({
        title: "Success",
        description: "Review submitted successfully",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    }
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
      status: 'completed',
      created_at: '2024-03-15',
      provider_response: 'approved',
      payment_status: 'completed',
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
        name: 'John Doe',
        phone: null,
        experience: null,
        email: null,
        cv_url: null,
        linkedin_profile: null
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
        name: 'Jane Smith',
        phone: null,
        experience: null,
        email: null,
        cv_url: null,
        linkedin_profile: null
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

          <div className="flex justify-between items-start mb-8">
            <Card className="flex-grow mr-8">
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

            <div className="relative">
              <label htmlFor="profile-image" className="cursor-pointer block">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 ring-4 ring-primary/20 hover:ring-primary/30 transition-all">
                  <div className="w-full h-full flex items-center justify-center relative group">
                    <UserRound className="w-16 h-16 text-gray-400 group-hover:text-gray-500 transition-colors" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/">Book a Service</Link>
            </Button>
          </div>

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

                      {booking.status === 'completed' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline"
                              className="ml-4"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Star className="w-4 h-4 mr-2" />
                              Leave Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Leave a Review</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.currentTarget);
                              handleReviewSubmit({
                                rating: parseInt(formData.get('rating') as string),
                                text: formData.get('text') as string
                              });
                            }} className="space-y-4 mt-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Rating</label>
                                <select 
                                  name="rating"
                                  className="w-full border rounded-md p-2"
                                  required
                                >
                                  <option value="">Select rating</option>
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Review</label>
                                <textarea 
                                  name="text"
                                  className="w-full border rounded-md p-2"
                                  rows={4}
                                  required
                                  placeholder="Write your review here..."
                                />
                              </div>
                              <Button type="submit" className="w-full">
                                Submit Review
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
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
