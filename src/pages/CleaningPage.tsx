import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

const providers = [
  { 
    id: 10, 
    name: "Julie Leroy", 
    rating: 4.6, 
    hourlyRate: 45, 
    yearsExperience: 5,
    image: "/photo-1649972904349-6e44c42644a7"
  },
  { 
    id: 11, 
    name: "Marc Girard", 
    rating: 4.8, 
    hourlyRate: 50, 
    yearsExperience: 8,
    image: "/photo-1581092795360-fd1ca04f0952"
  },
  { 
    id: 12, 
    name: "Anne Roux", 
    rating: 4.7, 
    hourlyRate: 48, 
    yearsExperience: 6,
    image: "/photo-1581091226825-a6a2a5aee158"
  },
];

const CleaningPage = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);

  const handleBooking = (providerId: number) => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "You need to select a date before booking",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Confirmed!",
      description: `Your appointment has been scheduled for ${selectedDate.toLocaleDateString()}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cleaning Services in Geneva</h1>
          
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
                <h2 className="text-xl font-semibold text-gray-800">Select Date</h2>
                <Card>
                  <CardContent className="pt-6">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                    <button
                      onClick={() => handleBooking(selectedProvider)}
                      className="w-full mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Book Appointment
                    </button>
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

export default CleaningPage;