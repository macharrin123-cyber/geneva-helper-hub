import { useEffect, useState } from "react";
import ServicePage from "@/components/ServicePage";
import { supabase } from "@/integrations/supabase/client";
import type { ServiceProvider } from "@/integrations/supabase/types";

interface Provider {
  id: number;
  name: string;
  rating: number;
  hourlyRate: number;
  yearsExperience: number;
  phone: string;
  image: string;
}

const PaintingPage = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .eq('service_type', 'painting');
      
      if (error) {
        console.error('Error fetching painting providers:', error);
        return;
      }

      const formattedProviders = (data as ServiceProvider[]).map(provider => ({
        id: parseInt(provider.id),
        name: 'Service Provider', // Default name since it's not in the database
        rating: 4.5, // Default rating
        hourlyRate: provider.hourly_rate,
        yearsExperience: 5, // Default experience
        phone: '+41 76 XXX XX XX', // Default phone
        image: provider.image_url
      }));

      setProviders(formattedProviders);
    };

    fetchProviders();
  }, []);

  return <ServicePage serviceType="painting" providers={providers} />;
};

export default PaintingPage;