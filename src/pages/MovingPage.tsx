import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    id: 1, 
    name: "Marc Dubois", 
    rating: 4.9, 
    hourlyRate: 95, 
    yearsExperience: 12,
    phone: "+41 76 567 89 01",
    image: "/photo-1581092795360-fd1ca04f0952"
  },
  { 
    id: 2, 
    name: "Sophie Laurent", 
    rating: 4.7, 
    hourlyRate: 85, 
    yearsExperience: 8,
    phone: "+41 76 678 90 12",
    image: "/photo-1649972904349-6e44c42644a7"
  },
  { 
    id: 3, 
    name: "Thomas Müller", 
    rating: 4.8, 
    hourlyRate: 90, 
    yearsExperience: 15,
    phone: "+41 76 789 01 23",
    image: "/photo-1486312338219-ce68d2c6f44d"
  },
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 21; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    slots.push(`${formattedHour}:00`);
    slots.push(`${formattedHour}:30`);
  }
  return slots;
};

const MovingPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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

    const provider = providers.find(p => p.id === providerId);
    if (!provider) {
      toast({
        title: "Error",
        description: "Selected provider not found",
        variant: "destructive",
      });
      return;
    }

    navigate('/payment', {
      state: {
        booking: {
          providerId: provider.id,
          providerName: provider.name,
          date: selectedDate,
          time: selectedTime,
          hourlyRate: provider.hourlyRate
        }
      }
    });
  };

  const handleCall = (provider: typeof providers[0]) => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Moving Services in Geneva</h1>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Available Providers</h2>
            {providers.map((provider) => (
              <div key={provider.id} className="space-y-4">
                <Card 
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

                {selectedProvider === provider.id && (
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Date & Time</h2>
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
                          onClick={() => handleBooking(provider.id)}
                          disabled={!selectedDate || !selectedTime}
                          className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Book Appointment
                        </button>
                        <button
                          onClick={() => handleCall(provider)}
                          className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Call Provider
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovingPage;
