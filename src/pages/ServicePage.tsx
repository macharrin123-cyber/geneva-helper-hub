import { useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for providers (in a real app, this would come from a backend)
const mockProviders = {
  plumbing: [
    { id: 1, name: "John Smith", rating: 4.8, hourlyRate: 85 },
    { id: 2, name: "Marie Dubois", rating: 4.9, hourlyRate: 90 },
  ],
  electrical: [
    { id: 3, name: "Thomas Weber", rating: 4.7, hourlyRate: 95 },
    { id: 4, name: "Sarah Mueller", rating: 4.8, hourlyRate: 88 },
  ],
  painting: [
    { id: 5, name: "Pierre Martin", rating: 4.6, hourlyRate: 75 },
    { id: 6, name: "Lisa Brown", rating: 4.9, hourlyRate: 82 },
  ],
  carpentry: [
    { id: 7, name: "Marc Fischer", rating: 4.8, hourlyRate: 92 },
    { id: 8, name: "Anna Schmidt", rating: 4.7, hourlyRate: 85 },
  ],
  cleaning: [
    { id: 9, name: "Elena Santos", rating: 4.9, hourlyRate: 45 },
    { id: 10, name: "David Chen", rating: 4.8, hourlyRate: 42 },
  ],
};

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const ServicePage = () => {
  const { service } = useParams();
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [specificRequests, setSpecificRequests] = useState("");

  const providers = service ? mockProviders[service as keyof typeof mockProviders] : [];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedProvider) {
      toast.error("Please select all required booking details");
      return;
    }

    // In a real app, this would make an API call to create the booking
    toast.success("Booking request sent successfully!");
    console.log({
      provider: selectedProvider,
      date: selectedDate,
      time: selectedTime,
      requests: specificRequests,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
        {service} Services
      </h1>

      {!selectedProvider ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedProvider(provider.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                <User className="h-10 w-10 text-gray-500" />
                <div>
                  <h3 className="font-semibold text-lg">{provider.name}</h3>
                  <p className="text-sm text-gray-600">
                    Rating: {provider.rating} ⭐️
                  </p>
                </div>
              </div>
              <p className="text-primary font-medium">
                CHF {provider.hourlyRate}/hour
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
          <button
            onClick={() => setSelectedProvider(null)}
            className="text-primary mb-4 hover:underline flex items-center gap-2"
          >
            ← Back to providers
          </button>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Select Date</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Select Time</h2>
              <Select onValueChange={setSelectedTime} value={selectedTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Specific Requests</h2>
              <Textarea
                placeholder="Describe your specific needs or requirements..."
                value={specificRequests}
                onChange={(e) => setSpecificRequests(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button onClick={handleBooking} className="w-full">
              Book Service
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePage;