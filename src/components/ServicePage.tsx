import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Phone, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Provider {
  id: number;
  name: string;
  rating: number;
  hourlyRate: number;
  yearsExperience: number;
  phone: string;
  image: string;
}

interface ServicePageProps {
  serviceType: 'plumbing' | 'electrical' | 'moving' | 'carpentry' | 'painting' | 'cleaning';
  providers: Provider[];
}

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 21; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    slots.push(`${formattedHour}:00`);
    slots.push(`${formattedHour}:30`);
  }
  return slots;
};

const ServicePage = ({ serviceType, providers }: ServicePageProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);

  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBooking = (providerId: number) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: t('services.selectDateTimeError'),
        description: t('services.selectDateTimeErrorDesc'),
        variant: "destructive",
      });
      return;
    }

    const provider = providers.find(p => p.id === providerId);
    if (!provider) {
      toast({
        title: t('services.providerNotFound'),
        description: t('services.providerNotFoundDesc'),
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

  const handleCall = (provider: Provider) => {
    toast({
      title: t('services.callingProvider'),
      description: `${t('services.connectingWith')} ${provider.name} ${provider.phone}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t(`services.${serviceType}`)}
          </h1>
          
          <div className="space-y-8">
            {providers.map((provider) => (
              <Card 
                key={provider.id}
                className={`overflow-hidden hover:shadow-lg transition-shadow ${
                  selectedProvider === provider.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-[300px,1fr] gap-6">
                    {/* Provider Image Section */}
                    <div className="relative h-[300px]">
                      <img 
                        src={provider.image}
                        alt={provider.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <button 
                          className="w-full bg-white text-gray-900 font-semibold rounded-full py-3 px-6 hover:bg-gray-100 transition-colors"
                          onClick={() => setSelectedProvider(provider.id)}
                        >
                          Select & Continue
                        </button>
                      </div>
                    </div>

                    {/* Provider Info Section */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{provider.name}</h2>
                          <div className="flex items-center gap-1 text-gray-700 mt-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-gray-500">(12 reviews)</span>
                          </div>
                          <p className="text-gray-600 mt-2">
                            {provider.yearsExperience} years of experience
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-gray-900">
                            CHF {provider.hourlyRate}/hr
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-semibold mb-3">How I can help:</h3>
                        <p className="text-gray-700">
                          Professional {serviceType} services with {provider.yearsExperience} years of experience. 
                          Available for both residential and commercial projects. Fully equipped with professional tools 
                          and ready to help with any {serviceType} needs.
                        </p>
                      </div>

                      {selectedProvider === provider.id && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold">
                            {t('services.selectDateTime')}
                          </h3>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                          />
                          <Select onValueChange={setSelectedTime} value={selectedTime}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={t('services.selectTime')} />
                            </SelectTrigger>
                            <SelectContent>
                              {generateTimeSlots().map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex gap-4">
                            <button
                              onClick={() => handleBooking(provider.id)}
                              disabled={!selectedDate || !selectedTime}
                              className="flex-1 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {t('services.bookAppointment')}
                            </button>
                            <button
                              onClick={() => handleCall(provider)}
                              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                            >
                              <Phone className="w-5 h-5" />
                              {t('services.callProvider')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicePage;