import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const providers = [
  { 
    id: 8, 
    name: "Antoine Richard", 
    rating: 4.9, 
    hourlyRate: 85, 
    yearsExperience: 18,
    phone: "+41 76 890 12 34",
    image: "/photo-1581092795360-fd1ca04f0952"
  },
  { 
    id: 9, 
    name: "Claire Simon", 
    rating: 4.7, 
    hourlyRate: 75, 
    yearsExperience: 9,
    phone: "+41 76 901 23 45",
    image: "/photo-1649972904349-6e44c42644a7"
  },
];

// Generate available time slots between 8 AM and 9 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 21; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    slots.push(`${formattedHour}:00`);
    slots.push(`${formattedHour}:30`);
  }
  return slots;
};

const CarpentryPage = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);

  const handleBooking = (providerId: number) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select both date and time",
        description: "You need to select both a date and time before booking",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Confirmed!",
      description: `Your appointment has been scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    });
  };

  const handleCall = (provider: typeof providers[0]) => {
    // In a real app, this would initiate a phone call
    toast({
      title: "Calling Provider",
      description: `Connecting you with ${provider.name} at ${provider.phone}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Carpentry Services in Geneva</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Available Providers</h2>
              {providers.map((provider) => (
                <Card 
                  key={provider.id}
                  className={`cursor-pointer transition-shadow hover:shadow-lg ${
                    selectedProvider === provider.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={provider.image}
                        alt={provider.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <CardTitle>{provider.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Rating: {provider.rating} ⭐</p>
                      <p className="text-sm text-gray-600">Rate: CHF {provider.hourlyRate}/hour</p>
                      <p className="text-sm text-gray-600">{provider.yearsExperience} years of experience</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedProvider && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Select Date & Time</h2>
                <Card>
                  <CardContent className="pt-6">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border mb-4"
                    />
                    <Select onValueChange={setSelectedTime} value={selectedTime}>
                      <SelectTrigger className="w-full mb-4">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeSlots().map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleBooking(selectedProvider)}
                        disabled={!selectedDate || !selectedTime}
                        className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Book Appointment
                      </button>
                      <button
                        onClick={() => handleCall(providers.find(p => p.id === selectedProvider)!)}
                        className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call Provider
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarpentryPage;