import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

interface BookingFormProps {
  providerId: number;
  providerName: string;
  selectedDate: Date;
  hourlyRate: number;
}

const BookingForm = ({ providerId, providerName, selectedDate, hourlyRate }: BookingFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [timeSlot, setTimeSlot] = useState("09:00");
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const timeSlots = [];
  for (let hour = 8; hour <= 18; hour++) {
    const formattedHour = hour.toString().padStart(2, "0");
    timeSlots.push(`${formattedHour}:00`);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const session = await supabase.auth.getSession();
    const isLoggedIn = !!session.data.session;

    try {
      // Create booking record in Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            provider_id: providerId,
            booking_date: selectedDate,
            booking_time: timeSlot,
            guest_name: isLoggedIn ? null : guestInfo.name,
            guest_email: isLoggedIn ? null : guestInfo.email,
            guest_phone: isLoggedIn ? null : guestInfo.phone,
            address: guestInfo.address,
            city: guestInfo.city,
            postal_code: guestInfo.postalCode,
            amount: hourlyRate,
            status: 'pending'
          }
        ])
        .select();

      if (error) throw error;

      // Redirect to payment page with booking ID
      if (data && data[0]) {
        navigate(`/payment/${data[0].id}`);
      }

    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Error",
        description: "There was a problem creating your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="timeSlot">Select Time</Label>
            <select
              id="timeSlot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={guestInfo.name}
                onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={guestInfo.email}
                onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={guestInfo.phone}
                onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Service Address</Label>
              <Input
                id="address"
                value={guestInfo.address}
                onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={guestInfo.city}
                onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={guestInfo.postalCode}
                onChange={(e) => setGuestInfo({ ...guestInfo, postalCode: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Proceed to Payment (CHF {hourlyRate})
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;