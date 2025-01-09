import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";
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
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {t('services.availableProviders')}
            </h2>
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
                      <p className="text-sm text-gray-600">{t('services.rating')}: {provider.rating} ⭐</p>
                      <p className="text-sm text-gray-600">{t('services.rate')}: CHF {provider.hourlyRate}/hour</p>
                      <p className="text-sm text-gray-600">{provider.yearsExperience} {t('services.experience')}</p>
                    </div>
                  </CardContent>
                </Card>

                {selectedProvider === provider.id && (
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {t('services.selectDateTime')}
                      </h2>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border mb-4"
                      />
                      <Select onValueChange={setSelectedTime} value={selectedTime}>
                        <SelectTrigger className="w-full mb-4">
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
                      <div className="space-y-2">
                        <button
                          onClick={() => handleBooking(provider.id)}
                          disabled={!selectedDate || !selectedTime}
                          className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t('services.bookAppointment')}
                        </button>
                        <button
                          onClick={() => handleCall(provider)}
                          className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {t('services.callProvider')}
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

export default ServicePage;