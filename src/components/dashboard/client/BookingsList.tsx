import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, MapPin, Repeat, Star } from "lucide-react";

interface Booking {
  id: string;
  user_id: string;
  provider_id: string;
  provider: {
    id: string;
    name: string;
    service_type: string;
    hourly_rate: number;
    image_url: string;
  };
  service_date: string;
  service_time: string;
  street_address: string;
  city: string;
  postal_code: string;
  comments: string | null;
  status: string;
  provider_response: string;
  payment_status: string;
}

interface BookingsListProps {
  bookings: Booking[];
}

const BookingsList = ({ bookings }: BookingsListProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleBookAgain = (providerId: string, serviceType: string) => {
    navigate(`/${serviceType.toLowerCase()}`, { state: { selectedProviderId: providerId } });
  };

  return (
    <div className="grid gap-4 md:gap-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="flex flex-col md:flex-row md:items-center gap-2">
              <div className="flex-1 text-center md:text-left">
                <span className="text-lg md:text-xl block md:inline">{booking.provider.service_type} Service</span>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mt-1 justify-center md:justify-start">
                  <span className="text-sm text-gray-600">Provider: {booking.provider.name}</span>
                  <div className="flex items-center gap-1 justify-center md:justify-start">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8 (24 reviews)</span>
                  </div>
                </div>
              </div>
              <span className={`text-sm px-3 py-1 rounded-full self-start md:self-center ${
                booking.provider_response === 'approved' ? 'bg-green-100 text-green-800' : 
                booking.provider_response === 'denied' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.provider_response.charAt(0).toUpperCase() + booking.provider_response.slice(1)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 md:pt-6">
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Date</p>
                    <p className="text-sm md:text-base font-medium">{new Date(booking.service_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Time</p>
                    <p className="text-sm md:text-base font-medium">{booking.service_time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Rate</p>
                    <p className="text-sm md:text-base font-medium">CHF {booking.provider.hourly_rate}/hour</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Location</p>
                    <p className="text-sm md:text-base font-medium">{booking.city}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Full Address</p>
                  <p className="text-sm md:text-base font-medium">{booking.street_address}, {booking.postal_code}</p>
                </div>
              </div>

              {booking.comments && (
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Comments</p>
                  <p className="text-sm md:text-base font-medium">{booking.comments}</p>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <div className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                    booking.provider_response === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : booking.provider_response === 'denied'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    Provider Status: {booking.provider_response}
                  </div>

                  <div className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                    booking.payment_status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    Payment: {booking.payment_status}
                  </div>
                </div>

                {booking.status === 'completed' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        size={isMobile ? "sm" : "default"}
                        className="w-full md:w-auto"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Leave Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Leave a Review</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4 mt-4">
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
                
                <Button
                  variant="default"
                  size={isMobile ? "sm" : "default"}
                  className="w-full md:w-auto"
                  onClick={() => handleBookAgain(booking.provider.id, booking.provider.service_type)}
                >
                  <Repeat className="w-4 h-4 mr-2" />
                  Book Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {bookings.length === 0 && (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">No bookings found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingsList;