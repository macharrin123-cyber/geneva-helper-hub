import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock data for providers based on service type
const serviceProviders = {
  1: [ // Plumbing
    { id: 1, name: "Jean Dupont", rating: 4.8, hourlyRate: 85, yearsExperience: 15 },
    { id: 2, name: "Marie Martin", rating: 4.6, hourlyRate: 75, yearsExperience: 8 },
    { id: 3, name: "Pierre Bernard", rating: 4.9, hourlyRate: 90, yearsExperience: 20 },
  ],
  2: [ // Electrical
    { id: 4, name: "Sophie Laurent", rating: 4.7, hourlyRate: 80, yearsExperience: 12 },
    { id: 5, name: "Lucas Moreau", rating: 4.5, hourlyRate: 70, yearsExperience: 6 },
  ],
  3: [ // Painting
    { id: 6, name: "Emma Petit", rating: 4.8, hourlyRate: 65, yearsExperience: 10 },
    { id: 7, name: "Thomas Dubois", rating: 4.6, hourlyRate: 60, yearsExperience: 7 },
  ],
  4: [ // Carpentry
    { id: 8, name: "Antoine Richard", rating: 4.9, hourlyRate: 85, yearsExperience: 18 },
    { id: 9, name: "Claire Simon", rating: 4.7, hourlyRate: 75, yearsExperience: 9 },
  ],
  5: [ // Cleaning
    { id: 10, name: "Julie Leroy", rating: 4.6, hourlyRate: 45, yearsExperience: 5 },
    { id: 11, name: "Marc Girard", rating: 4.8, hourlyRate: 50, yearsExperience: 8 },
    { id: 12, name: "Anne Roux", rating: 4.7, hourlyRate: 48, yearsExperience: 6 },
  ],
};

const serviceNames = {
  1: "Plumbing",
  2: "Electrical",
  3: "Painting",
  4: "Carpentry",
  5: "Cleaning",
};

const ServicePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);

  const serviceName = serviceNames[id as keyof typeof serviceNames] || "Service";
  const providers = serviceProviders[id as keyof typeof serviceProviders] || [];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{serviceName} Services in Geneva</h1>
          
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
                    <CardTitle>{provider.name}</CardTitle>
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

export default ServicePage;